import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsModule as PostsModuleCore } from '@core/posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostsModuleCore, CommentsModule],
  controllers: [PostsController],
})
export class PostsModule {}
