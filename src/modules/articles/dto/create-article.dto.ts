import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ example: 1, description: 'User ID of the author' })
    @IsNotEmpty()
    authorId: number;
}
