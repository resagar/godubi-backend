import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsModule as CommentsModuleCore } from '@core/posts/comments';

@Module({
  imports: [CommentsModuleCore],
  controllers: [CommentsController],
})
export class CommentsModule {}
