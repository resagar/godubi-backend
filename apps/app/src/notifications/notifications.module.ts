import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsModule as NotificationsModuleCore } from '@core/notifications/notifications.module';

@Module({
  imports: [NotificationsModuleCore],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
