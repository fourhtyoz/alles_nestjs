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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('create')
    async createArticle(@Body() createArticleDto: CreateCommentDto) {
        const newComment = await this.commentsService.create(createArticleDto);
        return newComment;
    }

    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateCommentDto,
    ) {
        return this.commentsService.update(id, updateArticleDto);
    }

    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.delete(id);
    }
}
