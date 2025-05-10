import { CreateCommentDto } from './create-comment.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiPropertyOptional({
        example: 'this is my updated comment',
    })
    text?: string;

    @ApiPropertyOptional({
        example: 2,
    })
    authorId?: number;

    @ApiPropertyOptional({
        example: 2,
    })
    articleId?: number;
}
