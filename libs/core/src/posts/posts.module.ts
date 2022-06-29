import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from '@core/posts/comments';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
