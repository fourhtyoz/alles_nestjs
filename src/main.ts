import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync(process.env.HTTPS_KEY || ''),
        cert: fs.readFileSync(process.env.HTTPS_CERT || ''),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });
    app.use(helmet());
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    // TODO: add authorization
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Alles Nest.js documentation')
        .setDescription('API documentation')
        .setVersion('1.0')
        // .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
