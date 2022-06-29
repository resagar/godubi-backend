import { Worker } from '@core/workers/entities/worker.entity';
import { Order } from '../entities/order.entity';

export class CreateWorkerOrderDto {
  workerOrder: WorkerOrderId[];
}

class WorkerOrderId {
  order: Order;
  worker: Worker;
  typeAction: string;
}
