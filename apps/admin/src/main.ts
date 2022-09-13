import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
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
  await app.listen(8000);
}

bootstrap();
