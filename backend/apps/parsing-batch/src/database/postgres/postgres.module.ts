import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBEntities } from '../main.entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'root',
        password: 'qwer1234',
        database: 'mydomain',
        entities: DBEntities,
        logging: true,
      }),
    }),
  ],
})
export class PostgresEntityModule {}
