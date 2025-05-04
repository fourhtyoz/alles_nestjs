import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { accessToken, refreshToken, user } =
            await this.authService.login(loginDto);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 15, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.send({ message: 'Login successful', user });
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];

        try {
            const accessToken =
                await this.authService.refreshToken(refreshToken);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 15, // 15 minutes
            });
            return res.json({ message: 'Refreshed successfully' });
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { message: 'Logged out' };
    }
}
