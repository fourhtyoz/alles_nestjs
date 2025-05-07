import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'typeorm.config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { CommentsModule } from './comments/comments.module';
import { ArticlesController } from './articles/articles.controller';
import { CommentsController } from './comments/comments.controller';
import { ChatModule } from './chat/chat.module';
import { CacheModule } from './cache/cache.module';
import { EmailModule } from './email/email.module';
import { ReportModule } from './report/report.module';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(AppDataSource.options),
        ChatModule,
        AuthModule,
        UsersModule,
        ArticlesModule,
        CommentsModule,
        CacheModule,
        EmailModule,
        ReportModule,
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
