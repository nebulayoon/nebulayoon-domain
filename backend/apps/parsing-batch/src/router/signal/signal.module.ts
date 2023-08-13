import { Module } from '@nestjs/common';
import { SignalController } from './signal.controller';
import { SignalService } from './signal.service';
import { QuasarzoneModule } from '../../site/quasarzone.module';

@Module({
  imports: [QuasarzoneModule],
  providers: [SignalService],
  exports: [SignalService],
  controllers: [SignalController],
})
export class SignalModule {}
