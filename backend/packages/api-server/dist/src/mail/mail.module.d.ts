import { DynamicModule } from '@nestjs/common';
export interface EmailConfig {
    user: string;
    pass: string;
}
export declare class MailModule {
    static register(emailconfig: EmailConfig): DynamicModule;
}
