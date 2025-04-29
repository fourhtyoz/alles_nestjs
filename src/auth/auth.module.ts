import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { 
                    expiresIn: '15m' // 15 minutes
                }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    exports: [JwtAuthGuard, AuthService]
})
export class AuthModule {}
