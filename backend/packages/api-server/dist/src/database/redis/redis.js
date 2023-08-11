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
exports.RedisRepository = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisRepository = exports.RedisRepository = class RedisRepository {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async get(key) {
        return this.redisClient.get(key);
    }
    async set(key, value) {
        await this.redisClient.set(key, value);
    }
    async getJson(key) {
        const data = await this.redisClient.get(key);
        return data ? JSON.parse(data) : null;
    }
    async setJson(key, value) {
        await this.redisClient.set(key, JSON.stringify(value));
    }
    async setExpirySec(key, value, expiryInSec = 3600) {
        await this.redisClient.set(key, value, 'EX', expiryInSec);
    }
    async del(key) {
        await this.redisClient.del(key);
    }
    async keys(pattern) {
        return this.redisClient.keys(pattern);
    }
};
exports.RedisRepository = RedisRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS')),
    __metadata("design:paramtypes", [ioredis_1.default])
], RedisRepository);
//# sourceMappingURL=redis.js.map