import { EntityService } from 'src/database/main.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { IAuthToken } from 'src/auth/types/auth.type';
import { RedisRepository } from '@database/redis/redis';
import { CustomLoggerService } from '@common/log/logger.service';
import { User } from '@database/entity';
import { Tokens } from './types/tokens.type';
import { MailService } from 'src/mail/mail.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare class UserService {
    private readonly entityService;
    private readonly authService;
    private readonly redisRepository;
    private readonly logger;
    private readonly mailService;
    constructor(entityService: EntityService, authService: AuthService, redisRepository: RedisRepository, logger: CustomLoggerService, mailService: MailService);
    private getUserByEmail;
    private validateDuplicateUser;
    register(registerDto: RegisterDto): Promise<User>;
    login(loginDto: LoginDto): Promise<Tokens>;
    newAuthToken(refreshToken: string, user: IAuthToken): Promise<string>;
    validateMultiUser(userId: string): Promise<boolean>;
    logout(userId: number): Promise<void>;
    sendEmailVerify(emailAddress: string): Promise<SMTPTransport.SentMessageInfo>;
    validateEmail(token: string): Promise<User>;
}
