import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { TimeModule } from '../time/time.module';

@Module({
  imports: [TimeModule],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
