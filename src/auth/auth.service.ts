import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        // @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...result } = user;
        return result;
    }

    async login(
        loginDto: LoginDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.validateUser(
            loginDto.username,
            loginDto.password,
        );
        const payload: TokenPayload = {
            username: user.username,
            sub: user.id,
        };
        return {
            accessToken: await this.generateAccessToken(payload),
            refreshToken: await this.generateRefreshToken(payload),
        };
    }

    async generateAccessToken(payload: TokenPayload) {
        return this.jwtService.sign(payload, {
            expiresIn: '15m',
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async generateRefreshToken(payload: TokenPayload) {
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

        await this.redis.set(`refresh_token:${payload.sub}`, 1, {
            EX: 7 * 24 * 60 * 60,
        });
        return refreshToken;
    }

    async validateRefreshToken(userId: number): Promise<boolean> {
        const exists = await this.redis.exists(`refresh_token:${userId}`);
        return exists === 1;
    }

    async invalidateRefreshToken(userId: number): Promise<void> {
        await this.redis.del(`refresh_token:${userId}`);
    }

    async verifyRefreshToken(token: string): Promise<TokenPayload> {
        const payload = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        return payload;
    }
}
