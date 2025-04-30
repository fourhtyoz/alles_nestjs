import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    // @IsNumber()
    authorId: number;

    @IsNotEmpty()
    // @IsNumber()
    articleId: number;
}
