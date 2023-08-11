import Redis from 'ioredis';
export declare class RedisRepository {
    private readonly redisClient;
    constructor(redisClient: Redis);
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
    getJson(key: string): Promise<any>;
    setJson(key: string, value: object): Promise<void>;
    setExpirySec(key: string, value: string, expiryInSec?: number): Promise<void>;
    del(key: string): Promise<void>;
    keys(pattern: string): Promise<string[]>;
}
