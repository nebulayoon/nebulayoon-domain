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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const logger_service_1 = require("../log/logger.service");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(logger, authService) {
        this.logger = logger;
        this.authService = authService;
    }
    async canActivate(ctx) {
        const request = ctx.switchToHttp().getRequest();
        const token = request.cookies['AT'];
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = (await this.authService.tokenVerify(token));
            request['user'] = payload;
            return payload.id !== undefined;
        }
        catch (e) {
            switch (e.name) {
                case 'JsonWebTokenError':
                    throw new common_1.HttpException('유효하지 않은 토큰입니다.', 401);
                case 'TokenExpiredError':
                    throw new common_1.HttpException('토큰이 만료되었습니다.', 400);
                default:
                    this.logger.error('[Default Token Error]', e.stack, e.context);
                    throw new common_1.HttpException('서버 오류', 500);
            }
        }
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    __param(0, (0, common_1.Inject)(logger_service_1.CustomLoggerService)),
    __param(1, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [logger_service_1.CustomLoggerService,
        auth_service_1.AuthService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map