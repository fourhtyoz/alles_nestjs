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
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { accessToken, refreshToken } =
            await this.authService.login(loginDto);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure:
                this.configService.get('NODE_ENV') === 'production'
                    ? true
                    : false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.send({ accessToken });
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies['refreshToken'];
        if (!token) {
            throw new UnauthorizedException('No refresh token');
        }

        const payload = await this.authService.verifyRefreshToken(token);
        if (!payload?.sub) {
            throw new UnauthorizedException('Unverified refresh token');
        }

        const isValid = await this.authService.validateRefreshToken(
            payload.sub,
        );
        if (!isValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // accessToken --- localStorage
        const accessToken = await this.authService.generateAccessToken(payload);

        // refreshToken --- cookie
        const refreshToken =
            await this.authService.generateRefreshToken(payload);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure:
                this.configService.get('NODE_ENV') === 'production'
                    ? true
                    : false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.json({ accessToken });
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        const payload = await this.authService.verifyRefreshToken(refreshToken);
        if (!payload?.sub) {
            throw new UnauthorizedException('Unverified refresh token');
        }

        await this.authService.invalidateRefreshToken(refreshToken);
        res.clearCookie('refreshToken');

        return res.send({ message: 'Success' });
    }
}
