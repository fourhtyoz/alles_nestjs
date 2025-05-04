import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
    ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findById(id);
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id/delete')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
