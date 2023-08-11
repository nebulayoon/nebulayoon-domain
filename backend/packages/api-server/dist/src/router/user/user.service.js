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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const main_service_1 = require("../../database/main.service");
const auth_service_1 = require("../../auth/auth.service");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const redis_1 = require("../../database/redis/redis");
const logger_service_1 = require("../../common/log/logger.service");
const mail_service_1 = require("../../mail/mail.service");
let UserService = exports.UserService = class UserService {
    constructor(entityService, authService, redisRepository, logger, mailService) {
        this.entityService = entityService;
        this.authService = authService;
        this.redisRepository = redisRepository;
        this.logger = logger;
        this.mailService = mailService;
    }
    async getUserByEmail(email) {
        const user = await (async () => {
            try {
                return await this.entityService.user.findUser({
                    email,
                });
            }
            catch (e) {
                this.logger.error('[UserService->login] findUser 실패', e.stack, e.context);
                return undefined;
            }
        })();
        if (user === undefined) {
            throw new common_1.HttpException('잘못된 인증 정보입니다.', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async validateDuplicateUser(email) {
        const user = await this.getUserByEmail(email);
        if (user) {
            throw new common_1.HttpException('이미 존재하는 유저입니다.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async register(registerDto) {
        const hashedPassword = await (0, bcrypt_1.hash)(registerDto.password, 10);
        await this.validateDuplicateUser(registerDto.email);
        try {
            this.sendEmailVerify(registerDto.email);
            return await this.entityService.user.create(Object.assign(Object.assign({}, registerDto), { password: hashedPassword }));
        }
        catch (e) {
            this.logger.error('[UserService->register] create 실패', e.stack, e.context);
            return undefined;
        }
    }
    async login(loginDto) {
        const user = await this.getUserByEmail(loginDto.email);
        if (!user) {
            throw new common_1.HttpException('잘못된 인증 정보입니다.', 400);
        }
        if (!user.emailVerify) {
            throw new common_1.HttpException('이메일 인증이 필요합니다.', 401);
        }
        const validatePassword = await (0, bcrypt_1.compare)(loginDto.password, user.password);
        if (!validatePassword) {
            throw new common_1.HttpException('잘못된 인증 정보입니다.', 400);
        }
        const atData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const rtData = {
            id: user.id,
            name: user.name,
            email: user.email,
            uuid: (0, uuid_1.v4)(),
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.authService.getAccessToken(atData),
            this.authService.getRefreshToken(rtData),
        ]);
        try {
            await this.redisRepository.set(user.id.toString(), refreshToken);
        }
        catch (e) {
            this.logger.error('[UserService->login] Redis Set 실패', e.stack, e.context);
            return undefined;
        }
        return { accessToken, refreshToken };
    }
    async newAuthToken(refreshToken, user) {
        const storedRefreshToken = await (async () => {
            try {
                return await this.redisRepository.get(user.id.toString());
            }
            catch (e) {
                return undefined;
            }
        })();
        if (!storedRefreshToken) {
            return undefined;
        }
        if (refreshToken !== storedRefreshToken) {
            return undefined;
        }
        const atData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const accessToken = await this.authService.getAccessToken(atData);
        return accessToken;
    }
    async validateMultiUser(userId) {
        const cacheHit = await this.redisRepository.get(userId);
        return cacheHit ? true : false;
    }
    async logout(userId) {
        await this.redisRepository.del(userId.toString());
    }
    async sendEmailVerify(emailAddress) {
        const emailVerifyData = {
            email: emailAddress,
        };
        const token = await this.authService.getEmailVerifyToken(emailVerifyData);
        return await this.mailService.sendMemberJoinVerification(emailAddress, token);
    }
    async validateEmail(token) {
        try {
            const payload = (await this.authService.tokenVerify(token));
            return await this.entityService.user.emailVerifyUpdate(payload.email);
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
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(main_service_1.EntityService)),
    __param(1, (0, common_1.Inject)(auth_service_1.AuthService)),
    __param(2, (0, common_1.Inject)(redis_1.RedisRepository)),
    __param(3, (0, common_1.Inject)(logger_service_1.CustomLoggerService)),
    __param(4, (0, common_1.Inject)(mail_service_1.MailService)),
    __metadata("design:paramtypes", [main_service_1.EntityService,
        auth_service_1.AuthService,
        redis_1.RedisRepository,
        logger_service_1.CustomLoggerService,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map