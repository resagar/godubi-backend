import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsModule as HashtagsModuleCore } from '@core/hashtags/hashtags.module';

@Module({
  controllers: [HashtagsController],
  imports: [HashtagsModuleCore],
})
export class HashtagsModule {}
