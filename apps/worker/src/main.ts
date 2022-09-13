import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
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
  await app.listen(8082);
}

bootstrap();
