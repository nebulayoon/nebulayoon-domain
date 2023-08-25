import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBEntities } from '../main.entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'postgresql',
        port: 5432,
        username: 'root',
        password: 'qwer1234',
        database: 'mydomain',
        entities: DBEntities,
        synchronize: true,
      }),
    }),
  ],
})
export class PostgresEntityModule {}
