import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderChangeStatusEvent } from '../events/order-change-status.event';
import { OrdersService } from '@core/orders/orders.service';
import { NotificationsService } from '@core/notifications/notifications.service';
import {
  CreateNotificationDto,
  OrderDto,
  UserDto,
} from '@core/notifications/dto';

@Injectable()
export class OrderChangeStatusListener {
  constructor(
    private orderService: OrdersService,
    private notificationService: NotificationsService,
  ) {}

  @OnEvent('order.change.status', { async: true })
  async handleOrderChangeStatusEvent(event: OrderChangeStatusEvent) {
    const users = await this.orderService.getUserFromNotification(
      event.orderId,
    );
    let usersId: number[] = [];
    usersId.push(users.user.id);
    users?.workerOrders?.map((workerOrder) =>
      usersId.push(workerOrder.worker.user.id),
    );
    usersId = usersId.filter((userId) => userId != event.userId);

    const notifications: CreateNotificationDto[] = [];
    usersId.map((userId) => {
      const notification: CreateNotificationDto = new CreateNotificationDto({
        text: `change status in order ${event.orderId}`,
        icon: 'work',
        action: `orders/${event.orderId}`,
        user: new UserDto(userId),
        order: new OrderDto(event.orderId),
      });
      notifications.push(notification);
    });
    await this.notificationService.create(notifications);
  }
}
