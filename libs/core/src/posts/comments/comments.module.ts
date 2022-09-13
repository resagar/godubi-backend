import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';
import { NotificationsModule } from '@core/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NotificationsModule],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
