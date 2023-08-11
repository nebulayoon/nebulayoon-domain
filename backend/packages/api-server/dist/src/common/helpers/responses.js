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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEntity = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
class ResponseEntity {
    constructor(status, message, data) {
        this.statusCode = status;
        this.message = message;
        this.data = data;
    }
    static CREATED() {
        return new ResponseEntity(common_1.HttpStatus.CREATED, ['success'], '');
    }
    static OK() {
        return new ResponseEntity(common_1.HttpStatus.OK, ['success'], '');
    }
    static OK_WITH(message) {
        return new ResponseEntity(common_1.HttpStatus.OK, message, '');
    }
    static OK_WITH_DATA(message, data) {
        return new ResponseEntity(common_1.HttpStatus.OK, message, data);
    }
    static FAILED() {
        return new ResponseEntity(common_1.HttpStatus.BAD_REQUEST, ['failed'], '');
    }
    static ERROR() {
        return new ResponseEntity(common_1.HttpStatus.INTERNAL_SERVER_ERROR, ['서버 에러가 발생했습니다.'], '');
    }
    static ERROR_WITH_DATA(message, code = common_1.HttpStatus.INTERNAL_SERVER_ERROR, data) {
        return new ResponseEntity(code, message, data);
    }
    get getStatusCode() {
        return this.statusCode;
    }
    get getMessage() {
        return this.message;
    }
    get getData() {
        return this.data;
    }
}
exports.ResponseEntity = ResponseEntity;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ResponseEntity.prototype, "statusCode", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Array)
], ResponseEntity.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], ResponseEntity.prototype, "data", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], ResponseEntity.prototype, "getStatusCode", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], ResponseEntity.prototype, "getMessage", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ResponseEntity.prototype, "getData", null);
//# sourceMappingURL=responses.js.map