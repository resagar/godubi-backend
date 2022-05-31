import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  public order_status: string;
  public order_budget: number;
  public title: string;
  public short_desc: string;
  public order_description: string;
  public order_time: Date;
  public payment_method: string;
  public website: string;
}
