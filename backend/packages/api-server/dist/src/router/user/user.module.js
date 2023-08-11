"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const auth_module_1 = require("../../auth/auth.module");
const mail_module_1 = require("../../mail/mail.module");
const config_1 = require("@nestjs/config");
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mail_module_1.MailModule.register({
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }),
        ],
        providers: [user_service_1.UserService, config_1.ConfigService],
        exports: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map