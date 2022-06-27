export class CreateWorkerOrderDto {
  workerOrder: WorkerOrderId[];
}

class WorkerOrderId {
  order: number;
  worker: number;
  typeAction: string;
}
