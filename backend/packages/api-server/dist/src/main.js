"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./common/env/env");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
async function bootstrap() {
    await (0, env_1.initEnv)();
    const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, '../secret/private-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../secret/cert.pem')),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    const origin = ['https://192.168.0.13:3001'];
    app.enableCors({
        origin: origin,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.disable('x-powerd-by');
    app.use(cookieParser());
    await app.listen(8888);
}
bootstrap();
//# sourceMappingURL=main.js.map