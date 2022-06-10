import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ServicesModule as ServicesModuleCore } from '@core';
import { CategoriesModule as CategoriesModuleCore } from '@core/categories/categories.module';

@Module({
  controllers: [CategoriesController],
  imports: [CategoriesModuleCore, ServicesModuleCore],
})
export class CategoriesModule {}
