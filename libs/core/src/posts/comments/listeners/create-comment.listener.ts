import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '@core/notifications/notifications.service';
import {
  CreateNotificationDto,
  OrderDto,
  UserDto,
} from '@core/notifications/dto';
import { CreateCommentEvent } from '../events/create-comment.event';
import { CommentsService } from '../comments.service';

@Injectable()
export class AddWorkerInOrderListener {
  constructor(
    private commentsService: CommentsService,
    private notificationService: NotificationsService,
  ) {}

  @OnEvent('order.add.worker', { async: true })
  async handleOrderChangeStatusEvent(event: CreateCommentEvent) {
    const comments = await this.commentsService.getUserFromNotification(
      event.postId,
    );
    let usersId: number[] = [];
    const orderId = comments[0].post.order.id;
    const postUserId = comments[0].post.user.id;
    usersId = comments.map((comment) => comment.user.id);
    usersId.push(postUserId);
    usersId = [...new Set(usersId)];
    usersId.filter((userId) => userId !== undefined && userId != event.userId);

    const notifications: CreateNotificationDto[] = [];
    usersId.map((userId) => {
      const notification: CreateNotificationDto = new CreateNotificationDto({
        text: `new comment in post`,
        icon: 'work',
        action: `orders/post/${event.postId}`,
        user: new UserDto(userId),
        order: new OrderDto(orderId),
      });
      notifications.push(notification);
    });
    await this.notificationService.create(notifications);
  }
}
