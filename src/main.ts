import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.setGlobalPrefix('api');
    app.enableCors();
    app.use(helmet());
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
