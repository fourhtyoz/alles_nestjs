import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: (configService: ConfigService) => {
                return new Redis.Redis({
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                });
            },
            inject: [ConfigService],
        },
        CacheService,
    ],
    exports: [CacheService],
})
export class CacheModule {}
