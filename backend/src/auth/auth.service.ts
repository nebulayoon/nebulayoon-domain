import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthToken,
  IEmailVerifyToken,
  IRefreshToken,
  TTokenCase,
} from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async getAccessToken(atData: IAuthToken) {
    return this.jwtService.signAsync(atData);
  }

  async getRefreshToken(rtData: IRefreshToken) {
    return this.jwtService.signAsync(rtData, { expiresIn: '30d' });
  }

  async getEmailVerifyToken(evtData: IEmailVerifyToken) {
    return this.jwtService.signAsync(evtData, { expiresIn: '1h' });
  }

  async tokenVerify(token: string): Promise<TTokenCase> {
    return this.jwtService.verify(token);
  }
}
