import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CustomLoggerService } from '@common/log/logger.service';
export declare class AuthGuard implements CanActivate {
    private readonly logger;
    private readonly authService;
    constructor(logger: CustomLoggerService, authService: AuthService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
