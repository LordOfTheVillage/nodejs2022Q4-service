import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { AccessTokenGuard } from '../../../guards/access-token.guard';
import { RefreshTokenGuard } from '../../../guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() data: AuthDto) {
    return this.authService.signUp(data);
  }

  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(AccessTokenGuard)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Body() data: RefreshDto, @Req() req) {
    return this.authService.refresh(data, req.user);
  }
}
