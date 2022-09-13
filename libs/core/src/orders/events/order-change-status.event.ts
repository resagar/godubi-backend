export class OrderChangeStatusEvent {
  constructor(public orderId: number, public userId: number) {}
}
