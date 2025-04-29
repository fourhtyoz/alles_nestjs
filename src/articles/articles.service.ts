import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './articles.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        const articles = (await this.articlesRepository.find()).sort(
            (a, b) => a.id - b.id,
        );
        return articles;
    }

    async findById(id: number): Promise<Article | null> {
        const article = await this.articlesRepository.findOne({
            where: { id },
        });
        return article;
    }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = this.articlesRepository.create(createArticleDto);
        return this.articlesRepository.save(article);
    }

    async update(
        id: number,
        updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        const exists = await this.articlesRepository.findOne({ where: { id } });
        if (!exists) {
            throw new NotFoundException('Article not found');
        }
        await this.articlesRepository.update(id, updateArticleDto);
        return this.articlesRepository.findOneOrFail({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.articlesRepository.delete(id);
    }
}
