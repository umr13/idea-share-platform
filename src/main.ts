import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Idea Share API')
    .setDescription('The Backend APIs for the Idea Share platform.')
    .setVersion('1.0')
    .addTag('idea-share')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger-ui', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
