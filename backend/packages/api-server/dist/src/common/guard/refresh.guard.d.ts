import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RedisRepository } from '@database/redis/redis';
import { CustomLoggerService } from '@common/log/logger.service';
export declare class RefreshGuard implements CanActivate {
    private readonly redisRepository;
    private readonly logger;
    private readonly authService;
    constructor(redisRepository: RedisRepository, logger: CustomLoggerService, authService: AuthService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
