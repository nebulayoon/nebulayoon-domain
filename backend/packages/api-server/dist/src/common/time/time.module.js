"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeModule = void 0;
const common_1 = require("@nestjs/common");
const time_service_1 = require("./time.service");
let TimeModule = exports.TimeModule = class TimeModule {
};
exports.TimeModule = TimeModule = __decorate([
    (0, common_1.Module)({
        providers: [time_service_1.TimeService],
        exports: [time_service_1.TimeService],
    })
], TimeModule);
//# sourceMappingURL=time.module.js.map