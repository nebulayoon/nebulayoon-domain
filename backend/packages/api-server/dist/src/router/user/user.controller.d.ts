import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { IAuthToken, IRefreshToken, IUserInfo } from 'src/auth/types/auth.type';
import { ResponseEntity } from '@common/helpers/responses';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<ResponseEntity<string>>;
    login(loginDto: LoginDto, res: Response): Promise<ResponseEntity<string> | ResponseEntity<{
        accessToken: string;
        refreshToken: string;
    }>>;
    newToken(req: Request, user: IRefreshToken, res: Response): Promise<ResponseEntity<string> | ResponseEntity<{
        refreshToken: string;
    }>>;
    logOut(user: IAuthToken): Promise<ResponseEntity<string>>;
    emailVerify(params: {
        token: string;
    }): Promise<ResponseEntity<string>>;
    loginCheck(user: IAuthToken): Promise<ResponseEntity<IUserInfo>>;
}
