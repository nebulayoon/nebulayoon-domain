import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async signToken(data: object) {
    return jwt.sign(data, env.TOKEN_SECRET, { expiresIn: 60 * 60 });
  }

  async decodeToken(token: string) {
    return jwt.decode(token);
  }

  async verifyTokenData() {}
}
