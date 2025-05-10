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
    UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('articles')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlesController {
    constructor(private readonly articlesServices: ArticlesService) {}

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.articlesServices.findAll();
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesServices.findById(id);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesServices.create(createArticleDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return await this.articlesServices.update(id, updateArticleDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesServices.delete(id);
    }
}
