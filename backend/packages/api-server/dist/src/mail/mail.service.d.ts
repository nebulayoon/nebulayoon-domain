import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare class MailService {
    private readonly transporter;
    constructor(transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>);
    sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string): Promise<SMTPTransport.SentMessageInfo>;
}
