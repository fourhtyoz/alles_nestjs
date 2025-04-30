import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './articles.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @InjectRepository(Article)
        private readonly articlesRepository: Repository<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        const articles = await this.articlesRepository.find({
            relations: ['author'],
            order: { id: 'ASC' },
        });
        return articles;
    }

    async findById(id: number): Promise<Article | null> {
        const article = await this.articlesRepository.findOne({
            where: { id },
        });
        if (!article) {
            throw new NotFoundException('Article not found');
        }
        return article;
    }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const author = await this.usersRepository.findOne({
            where: { id: createArticleDto.authorId },
        });
        if (!author) {
            throw new NotFoundException('Author not found');
        }
        const article = await this.articlesRepository.save({
            ...createArticleDto,
            author,
        });
        return article;
    }

    async update(
        id: number,
        updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        const { authorId, ...rest } = updateArticleDto;
        const article = await this.articlesRepository.preload({ id, ...rest });
        if (!article) {
            throw new NotFoundException('Article not found');
        }

        // TODO: for admins only
        if (authorId) {
            const author = await this.usersRepository.findOne({
                where: { id: authorId },
            });
            if (!author) {
                throw new NotFoundException('User not found');
            }
            article.author = author;
        }

        return await this.articlesRepository.save(article);
    }

    async delete(id: number): Promise<void> {
        await this.articlesRepository.delete(id);
    }
}
