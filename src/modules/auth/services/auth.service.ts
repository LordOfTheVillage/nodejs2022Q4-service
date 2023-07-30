import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async login() {
    return 'login';
  }

  async logout() {
    return 'logout';
  }
}
