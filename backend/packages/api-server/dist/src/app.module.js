"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const main_module_1 = require("./database/main.module");
const postgres_module_1 = require("./database/postgres/postgres.module");
const common_2 = require("./common");
const logger_module_1 = require("./common/middleware/logger/logger.module");
const router_1 = require("./router");
const redis_module_1 = require("./database/redis/redis.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            postgres_module_1.PostgresEntityModule,
            redis_module_1.RedisEntityModule,
            main_module_1.EntityServiceModule,
            common_2.LoggerModule,
            common_2.TimeModule,
            logger_module_1.MLoggerModule,
            auth_module_1.AuthModule,
            router_1.UserModule,
            mail_module_1.MailModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map