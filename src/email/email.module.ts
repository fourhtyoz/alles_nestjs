import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'EMAIL_TRANSPORT',
            useFactory: (configService: ConfigService) => {
                const env = configService.get('NODE_ENV');
                // TODO:
                if (env === 'production') {
                    const transport = nodemailer.createTransport({
                        auth: {
                            user: configService.get('EMAIL_ADMIN'),
                            pass: configService.get('EMAIL_PASS'),
                        },
                    });
                    return transport;
                } else {
                    const transport = nodemailer.createTransport({
                        host: 'localhost',
                        port: 1025,
                    });
                    return transport;
                }
            },
            inject: [ConfigService],
        },
        EmailService,
    ],
    exports: [EmailService],
})
export class EmailModule {}
