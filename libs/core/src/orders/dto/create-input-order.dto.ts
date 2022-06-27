export class CreateInputOrderDto {
  inputOrder: InputOrderId[];
}

class InputOrderId {
  order: number;
  input: number;
  value: string;
}
