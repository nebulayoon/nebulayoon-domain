"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresEntityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const main_entities_1 = require("../main.entities");
let PostgresEntityModule = exports.PostgresEntityModule = class PostgresEntityModule {
};
exports.PostgresEntityModule = PostgresEntityModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: '127.0.0.1',
                    port: 5432,
                    username: 'root',
                    password: 'qwer1234',
                    database: 'mydomain',
                    entities: main_entities_1.DBEntities,
                    synchronize: true,
                }),
            }),
        ],
    })
], PostgresEntityModule);
//# sourceMappingURL=postgres.module.js.map