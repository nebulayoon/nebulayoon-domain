import { LoggerService } from '@nestjs/common';
import { TimeService } from '../time/time.service';
export declare class CustomLoggerService implements LoggerService {
    private readonly timeService;
    private readonly logger;
    constructor(timeService: TimeService);
    error(message: string, stack?: string, context?: any): void;
    log(message: string, context?: any): void;
    warn(message: string, context?: any): void;
    debug(message: string, context?: any): void;
    verbose(message: string, context?: any): void;
}
