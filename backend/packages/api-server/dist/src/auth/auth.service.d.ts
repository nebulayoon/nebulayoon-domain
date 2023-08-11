import { JwtService } from '@nestjs/jwt';
import { IAuthToken, IEmailVerifyToken, IRefreshToken, TTokenCase } from './types/auth.type';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getAccessToken(atData: IAuthToken): Promise<string>;
    getRefreshToken(rtData: IRefreshToken): Promise<string>;
    getEmailVerifyToken(evtData: IEmailVerifyToken): Promise<string>;
    tokenVerify(token: string): Promise<TTokenCase>;
}
