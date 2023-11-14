import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { MailService } from './mail.service';
import * as nodemailer from 'nodemailer';

export interface EmailConfig {
  user: string;
  pass: string;
}

@Module({})
export class MailModule {
  static register(): DynamicModule {
    const emailConfig: EmailConfig = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    };

    console.log(emailConfig);

    return {
      module: MailModule,
      providers: [
        MailService,
        {
          provide: 'TRANSPORTER',
          useFactory: () => {
            return nodemailer.createTransport({
              service: 'Gmail',
              auth: emailConfig,
            });
          },
        },
      ],
      exports: [MailService],
    };
  }
}
