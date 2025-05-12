import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsEnum,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'test',
        description: 'The username of the user',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        example: 'email@gmail.com',
        description: 'The email of the user',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 123456,
        description: 'The password of the user',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Is the user active?',
    })
    isActive?: boolean;

    @ApiPropertyOptional({
        example: 'admin',
        description: 'The role of the user',
    })
    role?: any;
}
