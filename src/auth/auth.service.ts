import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";
import { TokenPayload } from "./interfaces/token-payload.interface";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService, 
        private configService: ConfigService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
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

    async login(loginDto: LoginDto): Promise<{ access_token: string; refresh_token: string, user: any }>{
        const user = await this.validateUser(loginDto.username, loginDto.password)
        const payload: TokenPayload = { 
            username: user.username, 
            sub: user.id 
        }
        return {
            access_token: this.generateAccessToken(payload),
            refresh_token: this.generateRefreshToken(payload),
            user : {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }

    private generateAccessToken(payload: TokenPayload) {
        return this.jwtService.sign(payload, { 
            expiresIn: '15m',
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        })
    }

    private generateRefreshToken(payload: TokenPayload) {
        return this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        })
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })

            const user = await this.usersService.findOneById(payload.sub)
            if (!user) {
                throw new UnauthorizedException('User not found')
            }
            const newPayload: TokenPayload = { 
                username: user.username, 
                sub: user.id 
            }
            return this.generateAccessToken(newPayload)
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token')
        }
    }
}