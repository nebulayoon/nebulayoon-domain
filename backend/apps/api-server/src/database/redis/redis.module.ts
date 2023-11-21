import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisRepository } from './redis';

@Global()
@Module({
  exports: [RedisRepository],
  providers: [
    {
      provide: 'REDIS',
      useValue: new Redis({
        host: 'redis',
        port: 6379,
      }),
    },
    RedisRepository,
  ],
})
export class RedisEntityModule {}
