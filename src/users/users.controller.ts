import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
    ParseIntPipe,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.userService.create(createUserDto);
        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        const users = await this.userService.findAll();
        return users;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOneById(+id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(+id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(+id);
    }
}
