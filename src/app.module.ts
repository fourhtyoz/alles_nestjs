import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AppDataSource } from 'typeorm.config';
import { CommentsModule } from './comments/comments.module';
import { ArticlesController } from './articles/articles.controller';
import { CommentsController } from './comments/comments.controller';
import { ChatModule } from './chat/chat.module';
import { LoggerMiddleware } from './logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(AppDataSource.options),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }),
        ChatModule,
        AuthModule,
        UsersModule,
        ArticlesModule,
        CommentsModule,
    ],
    controllers: [
        AuthController,
        UsersController,
        ArticlesController,
        CommentsController,
    ],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
