import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '@core/notifications/notifications.service';
import {
  CreateNotificationDto,
  OrderDto,
  UserDto,
} from '@core/notifications/dto';
import { WorkersService } from '@core/workers/workers.service';
import { AddWorkerInOrderEvent } from '../events/add-worker-in-order.event';

@Injectable()
export class AddWorkerInOrderListener {
  constructor(
    private workerService: WorkersService,
    private notificationService: NotificationsService,
  ) {}

  @OnEvent('order.add.worker', { async: true })
  async handleOrderChangeStatusEvent(event: AddWorkerInOrderEvent) {
    const worker = await this.workerService.getUserFromNotification(
      event.orderId,
    );
    const notifications: CreateNotificationDto[] = [];
    const notification: CreateNotificationDto = new CreateNotificationDto({
      text: `change status in order ${event.orderId}`,
      icon: 'work',
      action: `orders/${event.orderId}`,
      user: new UserDto(worker?.user.id),
      order: new OrderDto(event.orderId),
    });
    notifications.push(notification);
    await this.notificationService.create(notifications);
  }
}
