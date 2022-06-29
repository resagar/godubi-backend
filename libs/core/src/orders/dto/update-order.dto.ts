import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  public orderStatus: string;
  public orderBudget: number;
  public title: string;
  public shortDesc: string;
  public orderDescription: string;
  public orderTime: Date;
  public paymentMethod: string;
  public website: string;
}

export class UpdateOrderWorkerDto extends PartialType(CreateOrderDto) {
  public orderStatus: string;
  public orderTime: Date;
  public orderCost: number;
}

export class UpdateOrderAdminDto {}
