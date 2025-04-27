import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { RootController } from './app.controller';
import { AppDataSource } from 'typeorm.config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    PostsModule,
    AuthModule
  ],
  controllers: [RootController, UsersController],
  providers: [],
})
export class AppModule {}
