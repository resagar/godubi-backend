import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(apiAuthMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(8085);
}

bootstrap();
