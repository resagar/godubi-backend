import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import {
  CategoriesModule as CategoriesModuleCore,
  ServicesModule as ServicesModuleCore,
} from '@core';

@Module({
  controllers: [CategoriesController],
  imports: [CategoriesModuleCore, ServicesModuleCore],
})
export class CategoriesModule {}
