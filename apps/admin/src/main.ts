import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  app.use(apiAuthMiddleware);
  await app.listen(8000);
}

bootstrap();
