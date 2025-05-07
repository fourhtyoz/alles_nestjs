import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Article])],
    providers: [ArticlesService],
    controllers: [ArticlesController],
    exports: [TypeOrmModule, ArticlesService],
})
export class ArticlesModule {}
