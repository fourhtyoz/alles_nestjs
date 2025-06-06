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
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    // TODO: for admins only
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.commentsService.findAll();
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createArticle(@Body() createArticleDto: CreateCommentDto) {
        return await this.commentsService.create(createArticleDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateCommentDto,
    ) {
        return await this.commentsService.update(id, updateArticleDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return await this.commentsService.delete(id);
    }
}
