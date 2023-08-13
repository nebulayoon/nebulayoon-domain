import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { MailService } from './mail.service';
import * as nodemailer from 'nodemailer';

export interface EmailConfig {
  user: string;
  pass: string;
}

@Module({})
export class MailModule {
  static register(emailconfig: EmailConfig): DynamicModule {
    return {
      module: MailModule,
      providers: [
        MailService,
        {
          provide: 'TRANSPORTER',
          useFactory: () => {
            return nodemailer.createTransport({
              service: 'Gmail',
              auth: emailconfig,
            });
          },
        },
      ],
      exports: [MailService],
    };
  }
}
