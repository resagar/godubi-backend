import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiAuthMiddleware } from '@core/api-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(apiAuthMiddleware);
  await app.listen(8085);
}

bootstrap();
