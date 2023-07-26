import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  constructor(@Inject('REDIS') private readonly redisClient: Redis) {}

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async setExpirySec(
    key: string,
    value: string,
    expiryInSec: number = 3600,
  ): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expiryInSec);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redisClient.keys(pattern);
  }
}
