import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = this.notificationsRepository.create(
      createNotificationDto,
    );
    await this.notificationsRepository.save(newNotification);
    return newNotification;
  }

  async findAll(userId?: number) {
    const notifications: Notification[] =
      await this.notificationsRepository.find({
        relations: {
          user: true,
          order: true,
        },
        where: {
          user: {
            id: userId,
          },
        },
      });
    notifications.map((notification) =>
      notification.user.transformAvatarBufferToString(),
    );
    return notifications;
  }

  async findOne(id: number, userId?: number) {
    const notifications: Notification =
      await this.notificationsRepository.findOne({
        relations: {
          user: true,
          order: true,
        },
        where: {
          id,
          user: {
            id: userId,
          },
        },
      });
    notifications.user.transformAvatarBufferToString();
    return notifications;
  }

  // async update(id: number, updateNotificationDto: UpdateNotificationDto) {
  //   return `This action updates a #${id} notification`;
  // }

  async remove(id: number) {
    return await this.notificationsRepository.delete(id);
  }
}
