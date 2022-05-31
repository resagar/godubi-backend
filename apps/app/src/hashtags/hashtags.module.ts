import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsModule as HashtagsModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  controllers: [HashtagsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [HashtagsModuleCore],
})
export class HashtagsModule {}
