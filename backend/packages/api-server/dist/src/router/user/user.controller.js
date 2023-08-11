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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const auth_guard_1 = require("../../common/guard/auth.guard");
const user_decorator_1 = require("../../common/decorator/user.decorator");
const refresh_guard_1 = require("../../common/guard/refresh.guard");
const responses_1 = require("../../common/helpers/responses");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registerDto) {
        const result = await this.userService.register(registerDto);
        if (result === undefined) {
            return responses_1.ResponseEntity.FAILED();
        }
        return responses_1.ResponseEntity.CREATED();
    }
    async login(loginDto, res) {
        const { accessToken, refreshToken } = await this.userService.login(loginDto);
        if (accessToken === undefined || refreshToken === undefined) {
            return responses_1.ResponseEntity.FAILED();
        }
        res.cookie('AT', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.cookie('RT', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return responses_1.ResponseEntity.OK_WITH_DATA(['success'], {
            accessToken,
            refreshToken,
        });
    }
    async newToken(req, user, res) {
        const refreshToken = req.cookies['RT'];
        const newAccessToken = await this.userService.newAuthToken(refreshToken, user);
        if (!newAccessToken) {
            return responses_1.ResponseEntity.FAILED();
        }
        res.cookie('AT', newAccessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return responses_1.ResponseEntity.OK_WITH_DATA(['success'], { refreshToken });
    }
    async logOut(user) {
        await this.userService.logout(user.id);
        return responses_1.ResponseEntity.OK();
    }
    async emailVerify(params) {
        await this.userService.validateEmail(params.token);
        return responses_1.ResponseEntity.OK();
    }
    async loginCheck(user) {
        const userInfo = {
            name: user.name,
            email: user.email,
        };
        return responses_1.ResponseEntity.OK_WITH_DATA(['success'], userInfo);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('token'),
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newToken", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)('email-verify/:token'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "emailVerify", null);
__decorate([
    (0, common_1.Post)('login-check'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginCheck", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map