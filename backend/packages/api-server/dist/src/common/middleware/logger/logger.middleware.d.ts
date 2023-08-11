import { CustomLoggerService } from '@common/log/logger.service';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly logger;
    constructor(logger: CustomLoggerService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
