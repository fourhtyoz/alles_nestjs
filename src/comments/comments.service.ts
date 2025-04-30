import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { Article } from 'src/articles/articles.entity';
import { User } from 'src/users/users.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Article)
        private readonly articlesRepository: Repository<Article>,
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const author = await this.usersRepository.findOne({
            where: { id: createCommentDto.authorId },
        });
        if (!author) {
            throw new NotFoundException('User not found');
        }

        const article = await this.articlesRepository.findOne({
            where: { id: createCommentDto.articleId },
        });
        if (!article) {
            throw new NotFoundException('Article not found');
        }

        const comment = await this.commentsRepository.save({
            ...createCommentDto,
            author,
            article,
        });
        return comment;
    }

    async update(
        id: number,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        const { authorId, articleId, ...rest } = updateCommentDto;
        const comment = await this.commentsRepository.preload({ id, ...rest });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        // TODO: for admins only
        if (authorId) {
            const author = await this.usersRepository.findOne({
                where: { id: authorId },
            });
            if (!author) {
                throw new NotFoundException('User not found');
            }
            comment.author = author;
        }

        if (articleId) {
            const article = await this.articlesRepository.findOne({
                where: { id: articleId },
            });
            if (!article) {
                throw new NotFoundException('Article not found');
            }
            comment.article = article;
        }

        return await this.commentsRepository.save(comment);
    }

    async delete(id: number): Promise<void> {
        await this.commentsRepository.delete(id);
    }

    async findAll() {
        return await this.commentsRepository.find({
            relations: ['author', 'article'],
            order: { id: 'ASC' },
        });
    }
}
