import { Module } from '@nestjs/common';
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

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(AppDataSource.options),
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
export class AppModule {}
