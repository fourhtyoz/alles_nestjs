import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    NotFoundException,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesServices: ArticlesService) {}

    @Get()
    async findAll() {
        const articles = await this.articlesServices.findAll();
        return articles;
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const article = this.articlesServices.findById(id);
        if (!article) {
            throw new NotFoundException('Article not found');
        }
        return article;
    }

    @Post('create')
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        const newArticle = await this.articlesServices.create(createArticleDto);
        return newArticle;
    }

    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return this.articlesServices.update(id, updateArticleDto);
    }

    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return this.articlesServices.delete(id);
    }
}
