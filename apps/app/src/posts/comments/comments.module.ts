import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsModule as CommentsModuleCore } from '@core/posts/comments';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [CommentsModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
