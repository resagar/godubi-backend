import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesModule as CategoriesModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [CategoriesModuleCore],
})
export class CategoriesModule {}
