import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  constructor(
    @Inject('TRANSPORTER')
    private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const url = `https://${process.env.API_SERVER_URL}/user/email-verify/${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        안녕하세요! nebulayoon 입니다.<br/>
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="GET">
          <button style="text-decoration-line: underline; cursor: pointer; color: 'blue'">가입확인</button>
        </form>
        이메일을 받지 못하셨나요? 스펨메일함을 찾아보세요.<br/>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
