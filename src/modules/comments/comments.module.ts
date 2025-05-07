import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UsersModule } from 'src/modules/users/users.module';
import { ArticlesModule } from 'src/modules/articles/articles.module';

@Module({
    imports: [UsersModule, ArticlesModule, TypeOrmModule.forFeature([Comment])],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [TypeOrmModule, CommentsService],
})
export class CommentsModule {}
