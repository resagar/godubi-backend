import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import {
  CategoriesModule as CategoriesModuleCore,
  HashtagsModule as HashtagsModuleCore,
  ServicesModule as ServicesModuleCore,
  UsersModule as UsersModuleCore,
} from '@core';

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
