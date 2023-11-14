import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../../auth/auth.module';
import { MailModule } from '../..//mail/mail.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, MailModule.register()],
  providers: [UserService, ConfigService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
