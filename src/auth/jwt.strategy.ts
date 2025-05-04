import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: (req) => {
                return req.cookies['accessToken'];
            },
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET', ''),
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username,
        };
    }
}
