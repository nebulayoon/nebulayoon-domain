"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.RegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const entity_1 = require("../../../database/entity");
class RegisterDto extends (0, swagger_1.OmitType)(entity_1.User, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
]) {
}
exports.RegisterDto = RegisterDto;
class LoginDto extends (0, swagger_1.OmitType)(entity_1.User, [
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'deletedAt',
]) {
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=user.dto.js.map