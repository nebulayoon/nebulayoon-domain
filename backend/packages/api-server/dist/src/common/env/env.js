"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEnv = void 0;
const dotenv = require("dotenv");
async function initEnv() {
    dotenv.config();
    const env = {
        TOKEN_SECRET: process.env.TOKEN_SECRET,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: parseInt(process.env.REDIS_PORT),
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
    };
    globalThis.env = env;
}
exports.initEnv = initEnv;
//# sourceMappingURL=env.js.map