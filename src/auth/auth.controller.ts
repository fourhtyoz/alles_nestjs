import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { accessToken, refreshToken, user } =
            await this.authService.login(loginDto);

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'none',
            maxAge: 1000 * 60 * 15, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return { message: 'Logged in', user };
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { message: 'Logged out' };
    }
}
