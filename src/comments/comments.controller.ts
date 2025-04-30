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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    // TODO: for admins only
    @Get()
    async findAll() {
        return await this.commentsService.findAll();
    }

    @Post('create')
    async createArticle(@Body() createArticleDto: CreateCommentDto) {
        return await this.commentsService.create(createArticleDto);
    }

    @Put(':id/update')
    async updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateCommentDto,
    ) {
        return await this.commentsService.update(id, updateArticleDto);
    }

    @HttpCode(204)
    @Delete(':id/delete')
    async deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return await this.commentsService.delete(id);
    }
}
