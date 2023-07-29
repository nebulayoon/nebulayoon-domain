import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { TimeModule } from '../time/time.module';

@Global()
@Module({
  imports: [TimeModule],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
