export class CreateInputOrderDto {
  inputOrder: InputOrderId;
}

class InputOrderId {
  orderId: number;
  inputId: number;
  value: string;
}
