import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Delete,
    HttpCode,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlesController {
    constructor(private readonly articlesServices: ArticlesService) {}

    @Get()
    async findAll() {
        return await this.articlesServices.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesServices.findById(id);
    }

    @Post('create')
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesServices.create(createArticleDto);
    }

    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return await this.articlesServices.update(id, updateArticleDto);
    }

    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesServices.delete(id);
    }
}
