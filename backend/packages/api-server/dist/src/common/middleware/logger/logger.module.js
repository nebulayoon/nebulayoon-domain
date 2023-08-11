"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const logger_middleware_1 = require("./logger.middleware");
class MLoggerModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
}
exports.MLoggerModule = MLoggerModule;
//# sourceMappingURL=logger.module.js.map