import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import { User } from "src/users/users.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<Boolean> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            return bcrypt.compare(password, user.password)
        }
        return false
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}