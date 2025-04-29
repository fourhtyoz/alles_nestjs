import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { RootController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AppDataSource } from 'typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(AppDataSource.options),
        UsersModule,
        ArticlesModule,
        AuthModule,
    ],
    controllers: [RootController, UsersController, AuthController],
    providers: [],
})
export class AppModule {}
