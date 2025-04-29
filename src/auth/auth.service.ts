import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

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

    // TODO: refresh token
    async login(loginDto: LoginDto): Promise<{ access_token: string; user: any }>{
        const user = await this.validateUser(loginDto.username, loginDto.password)
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
            user : {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }
}