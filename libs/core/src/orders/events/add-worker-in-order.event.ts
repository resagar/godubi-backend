export class AddWorkerInOrderEvent {
  constructor(public orderId: number, public workerId: number) {}
}
