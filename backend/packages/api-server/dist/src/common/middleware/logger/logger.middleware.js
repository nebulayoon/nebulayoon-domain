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
exports.LoggerMiddleware = void 0;
const logger_service_1 = require("../../log/logger.service");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let LoggerMiddleware = exports.LoggerMiddleware = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    async use(req, res, next) {
        var _a, _b;
        const url = req.originalUrl.split('?')[0];
        const uuid = (0, uuid_1.v4)();
        const startTime = new Date().getTime();
        const ipAddr = (_b = ((((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.split(',')[0]) ||
            req.socket.remoteAddress))) === null || _b === void 0 ? void 0 : _b.replace('\\', '').split('::ffff:').reverse()[0];
        const requestLog = `[REQ][${uuid}] | ${ipAddr} | "${req.method} ${url}" ${JSON.stringify(Object.assign(Object.assign({}, req.query), req.body))} | ${req.headers['user-agent']}`;
        this.logger.verbose(requestLog);
        res.on('finish', () => {
            const responseLog = `[RES][${uuid}] | ${ipAddr} | "${req.method} ${res.statusCode} ${url}" | ${req.headers['user-agent']} | ${(new Date().getTime() - startTime).toLocaleString()}ms`;
            this.logger.verbose(responseLog);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.CustomLoggerService)),
    __metadata("design:paramtypes", [logger_service_1.CustomLoggerService])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map