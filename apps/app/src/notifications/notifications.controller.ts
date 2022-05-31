import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { NotificationsService } from '@core/notifications/notifications.service';
import { CreateNotificationDto } from '@core/notifications/dto/create-notification.dto';
import { UserAuthInterface } from '@core/auth/userAuth.interface';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll(@Request() req: UserAuthInterface) {
    return this.notificationsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: UserAuthInterface, @Param('id') id: string) {
    return this.notificationsService.findOne(+id, req.user.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationsService.update(+id, updateNotificationDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationsService.remove(+id);
  // }
}
