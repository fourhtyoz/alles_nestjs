import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleDestroy {
    constructor(@Inject('REDIS_CLIENT') private readonly client: Redis.Redis) {}

    onModuleDestroy() {
        this.client.quit();
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await this.client.set(key, value, 'EX', ttl);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string): Promise<number> {
        return this.client.del(key);
    }
}
