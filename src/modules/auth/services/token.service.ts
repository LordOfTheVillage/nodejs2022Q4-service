import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

type EncryptedData = Record<string, string | number>;

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(encryptedData: EncryptedData) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        encryptedData,
        process.env.JWT_SECRET_KEY,
        process.env.TOKEN_EXPIRE_TIME,
      ),
      this.generateToken(
        encryptedData,
        process.env.JWT_SECRET_REFRESH_KEY,
        process.env.TOKEN_REFRESH_EXPIRE_TIME,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  generateToken(
    encryptedData: EncryptedData,
    secret: string,
    expiresIn: string,
  ) {
    return this.jwtService.signAsync(
      { ...encryptedData },
      {
        secret,
        expiresIn,
      },
    );
  }

  hashData(data: string) {
    const rounds = 10;
    return bcrypt.hash(data, rounds);
  }

  async matchHash(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
