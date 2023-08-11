"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const nodemailer = require("nodemailer");
let MailModule = exports.MailModule = MailModule_1 = class MailModule {
    static register(emailconfig) {
        return {
            module: MailModule_1,
            providers: [
                mail_service_1.MailService,
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
            exports: [mail_service_1.MailService],
        };
    }
};
exports.MailModule = MailModule = MailModule_1 = __decorate([
    (0, common_1.Module)({})
], MailModule);
//# sourceMappingURL=mail.module.js.map