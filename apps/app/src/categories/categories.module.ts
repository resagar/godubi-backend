import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesModule as CategoriesModuleCore } from '@core';

@Module({
  controllers: [CategoriesController],
  imports: [CategoriesModuleCore],
})
export class CategoriesModule {}
