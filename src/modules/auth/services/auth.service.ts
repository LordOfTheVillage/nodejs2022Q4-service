import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthDto } from '../dto/auth.dto';
import { UserService } from '../../user/services/user.service';
import { JwtPayload } from '../types/jwt-payload.type';
import { RefreshDto } from '../dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async signUp(authDto: AuthDto) {
    const hash = await this.tokenService.hashData(authDto.password);
    const newUser = await this.userService.createUser({
      ...authDto,
      password: hash,
    });
    return {
      ...(await this.tokenService.getTokens({
        id: newUser.id,
        login: newUser.login,
      })),
      id: newUser.id,
      login: newUser.login,
    };
  }

  async login(data: AuthDto) {
    const user = await this.userService.findUserByLogin(data.login);
    if (!user)
      throw new ForbiddenException("User with this login doesn't exist");

    console.log(user);
    console.log(data);

    const passwordMatches = await this.tokenService.matchHash(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException("Password doesn't match");

    return await this.tokenService.getTokens({
      id: user.id,
      login: user.login,
    });
  }

  async refresh(data: RefreshDto, reqData: JwtPayload) {
    if (!data.refreshToken)
      throw new UnauthorizedException("Refresh token doesn't exist");

    const user = await this.userService.findUserById(reqData.id);
    if (!user) throw new ForbiddenException("User doesn't exist");

    return await this.tokenService.getTokens({
      id: user.id,
      login: user.login,
    });
  }
}
