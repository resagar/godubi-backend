import { Input } from '@core/inputs/entities/input.entity';
import { Order } from '../entities/order.entity';

export class CreateInputOrderDto {
  inputOrder: InputOrderId[];
}

class InputOrderId {
  order: Order;
  input: Input;
  value: string;
}
