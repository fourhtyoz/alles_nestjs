import { CreateArticleDto } from './create-article.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @ApiPropertyOptional({
        example: 'My updated title',
        description: 'The title of the article',
    })
    title?: string;
    @ApiPropertyOptional({
        example: 'My updated text',
        description: 'The text of the article',
    })
    text?: string;
    @ApiPropertyOptional({
        example: 2,
        description: 'New User ID of the article',
    })
    authorId?: number;
}
