import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        example: 'updated_username',
        description: 'The updated username (optional)',
    })
    username?: string;

    @ApiPropertyOptional({
        example: 'updated@example.com',
        description: 'The updated email (optional)',
    })
    email?: string;

    @ApiPropertyOptional({
        example: 'newStrongPassword123',
        description: 'The updated password (optional, min 8 characters)',
        minLength: 8,
    })
    password?: string;

    @ApiPropertyOptional({
        example: false,
        description: 'Whether the user is active (optional)',
    })
    isActive?: boolean;

    @ApiPropertyOptional({
        example: Role.Admin,
        description: 'The role of the user',
    })
    role?: any;
}
