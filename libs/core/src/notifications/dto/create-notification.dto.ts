import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@core/users/dto';
import { CreateOrderDto } from '@core/orders/dto';

export class CreateNotificationDto {
  id: number;
  read: number;
  text: string;
  icon: string;
  action: string;
  admin: number;
  user: UserDto;
  order: OrderDto;

  constructor(partial?: Partial<CreateNotificationDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends PickType(CreateUserDto, ['id'] as const) {
  constructor(public id: number) {
    super(id);
  }
}

export class OrderDto extends PickType(CreateOrderDto, ['id'] as const) {
  constructor(public id: number) {
    super(id);
  }
}
