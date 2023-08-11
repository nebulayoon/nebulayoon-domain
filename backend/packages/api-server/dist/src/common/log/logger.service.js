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
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const time_service_1 = require("../time/time.service");
const winston = require("winston");
let CustomLoggerService = exports.CustomLoggerService = class CustomLoggerService {
    constructor(timeService) {
        this.timeService = timeService;
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.printf((obj) => {
                        return `${obj.level}: [${this.timeService.getTime(new Date())}] ${obj.message} ${obj.stack ? '| STACK:' + obj.stack : ''} ${obj.context ? '| CONTEXT:' + obj.context : ''}`;
                    })),
                }),
            ],
        });
    }
    error(message, stack, context) {
        const args = { message, stack, context };
        this.logger.error(args);
    }
    log(message, context) {
        this.logger.info({ message, context });
    }
    warn(message, context) {
        this.logger.warn({ message, context });
    }
    debug(message, context) {
        this.logger.debug({ message, context });
    }
    verbose(message, context) {
        this.logger.verbose({ message, context });
    }
};
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(time_service_1.TimeService)),
    __metadata("design:paramtypes", [time_service_1.TimeService])
], CustomLoggerService);
//# sourceMappingURL=logger.service.js.map