import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from '@core/posts/comments';
import { NotificationsModule } from '@core/notifications/notifications.module';
import { PostListener } from './listeners/post.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), NotificationsModule],
  providers: [PostsService, PostListener],
  exports: [PostsService],
})
export class PostsModule {}
