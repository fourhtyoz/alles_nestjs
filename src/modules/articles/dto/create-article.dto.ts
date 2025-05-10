import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @ApiProperty({
        example: 'Title',
        description: 'The title of the article',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'This is my text',
        description: 'The text of the article',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        example: 1,
        description: 'User ID of the author',
        required: true,
    })
    @IsNotEmpty()
    authorId: number;
}
