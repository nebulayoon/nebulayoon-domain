import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBEntities } from './main.entities';
import { EntityService } from './main.service';
import {
  ProductEntityService,
  UserEntityService,
} from '@libs/database/service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(DBEntities)],
  providers: [EntityService, UserEntityService, ProductEntityService],
  exports: [EntityService],
})
export class EntityServiceModule {}
