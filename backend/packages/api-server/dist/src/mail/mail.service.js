"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = exports.MailService = class MailService {
    constructor(transporter) {
        this.transporter = transporter;
    }
    async sendMemberJoinVerification(emailAddress, signupVerifyToken) {
        const url = `https://192.168.0.13:8888/user/email-verify/${signupVerifyToken}`;
        const mailOptions = {
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
};
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TRANSPORTER')),
    __metadata("design:paramtypes", [Object])
], MailService);
//# sourceMappingURL=mail.service.js.map