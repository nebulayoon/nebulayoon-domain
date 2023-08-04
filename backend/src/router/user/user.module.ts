import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MailModule.register({
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }),
  ],
  providers: [UserService, ConfigService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
