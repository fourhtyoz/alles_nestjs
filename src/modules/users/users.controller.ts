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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/user.decortator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decortator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get('excel_report')
    async getReport(@CurrentUser() user: any) {
        this.userService.sendUsersReport(user.email).catch((err) => {
            console.error('Failed to generate report:', err);
        });
        return {
            success: true,
            message:
                'Report generation started. You will receive an email when ready.',
        };
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.Admin])
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findById(id);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateUserDto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Delete(':id/delete')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
