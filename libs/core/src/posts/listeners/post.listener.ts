import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePostEvent } from '../events/create-post.event';
import { PostsService } from '../posts.service';
import { NotificationsService } from '@core/notifications/notifications.service';
import {
  CreateNotificationDto,
  OrderDto,
  UserDto,
} from '@core/notifications/dto';

@Injectable()
export class PostListener {
  constructor(
    private postsService: PostsService,
    private notificationService: NotificationsService,
  ) {}

  @OnEvent('post.created', { async: true })
  async handleCreatePostEvent(event: CreatePostEvent) {
    const users = await this.postsService.getUserFromNotification(event.postId);
    let usersId: number[] = [];
    usersId.push(users?.user?.id);
    usersId.push(users.order?.user?.id);
    users?.order?.workerOrders?.map((workerOrder) =>
      usersId.push(workerOrder?.worker?.user?.id),
    );
    usersId = usersId.filter(
      (userId, i, arrayUsers) =>
        userId != undefined &&
        userId != event.userId &&
        arrayUsers.indexOf(userId) === i,
    );

    const notifications: CreateNotificationDto[] = [];
    usersId.map((userId) => {
      const notification: CreateNotificationDto = new CreateNotificationDto({
        text: `have new post in order ${users.order.id}`,
        icon: 'work',
        action: `orders/${users.order.id}`,
        user: new UserDto(userId),
        order: new OrderDto(users.order.id),
      });
      notifications.push(notification);
    });
    await this.notificationService.create(notifications);
  }
}
