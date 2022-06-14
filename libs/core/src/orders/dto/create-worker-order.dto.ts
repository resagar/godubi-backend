export class CreateWorkerOrderDto {
  workerOrder: WorkerOrderId;
}

class WorkerOrderId {
  orderId: number;
  workerId: number;
  typeAction: string;
}
