import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: buildCorsOrigin(app) });

  const config = new DocumentBuilder()
    .setTitle('dz dialect sentence API')
    .setDescription('Sentences API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(process.env.PORT || 3000);
}

function buildCorsOrigin(app: INestApplication): string[] {
  try {
    return JSON.parse(app.get(ConfigService).get('CORS_ORIGIN'));
  } catch {
    return [app.get(ConfigService).get('CORS_ORIGIN')];
  }
}

bootstrap();
