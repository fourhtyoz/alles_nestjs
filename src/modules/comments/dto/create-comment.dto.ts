import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({
        example: 'This is my comment',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    articleId: number;
}
