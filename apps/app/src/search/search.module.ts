import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { HashtagsModule as HashtagsModuleCore } from '@core/hashtags/hashtags.module';
import { ServicesModule as ServicesModuleCore } from '@core/services/services.module';
import { UsersModule as UsersModuleCore } from '@core/users/users.module';
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
