export class CreateServiceWorkerDto {
  public workerService: WorkerService[];
}

class WorkerService {
  public worker: number;
  public service: number;
  priorityType: string;
}
