import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsModule as HashtagsModuleCore } from '@core';

@Module({
  controllers: [HashtagsController],
  imports: [HashtagsModuleCore],
})
export class HashtagsModule {}
