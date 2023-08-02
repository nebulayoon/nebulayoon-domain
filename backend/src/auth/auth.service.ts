import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthToken, IRefreshToken } from './type/auth.type';

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async getAccessToken(atData: IAuthToken) {
    return this.jwtService.signAsync(atData);
  }

  async getRefreshToken(rtData: IRefreshToken) {
    return this.jwtService.signAsync(rtData, { expiresIn: '30d' });
  }

  async tokenVerify(token: string): Promise<IAuthToken | IRefreshToken> {
    return this.jwtService.verify(token);
  }
}
