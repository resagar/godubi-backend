import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsModule as PostsModuleCore } from '@core';
import { CommentsModule } from './comments/comments.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [PostsModuleCore, CommentsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
