import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBEntities } from './main.entities';
import { EntityService } from './main.service';
import {
  ProductEntityService,
  ProductMonetaryUnitEntityService,
  ProductStateEntityService,
} from './service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(DBEntities)],
  providers: [
    EntityService,
    ProductEntityService,
    ProductStateEntityService,
    ProductMonetaryUnitEntityService,
  ],
  exports: [EntityService],
})
export class EntityServiceModule {}
