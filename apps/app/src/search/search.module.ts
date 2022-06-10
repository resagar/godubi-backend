import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import {
  HashtagsModule as HashtagsModuleCore,
  ServicesModule as ServicesModuleCore,
  UsersModule as UsersModuleCore,
} from '@core';
import { CategoriesModule as CategoriesModuleCore } from '@core/categories/categories.module';

@Module({
  imports: [
    CategoriesModuleCore,
    UsersModuleCore,
    ServicesModuleCore,
    HashtagsModuleCore,
  ],
  controllers: [SearchController],
})
export class SearchModule {}
