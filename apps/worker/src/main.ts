import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  app.enableCors();
  app.use(apiAuthMiddleware);
  await app.listen(8082);
}

bootstrap();
