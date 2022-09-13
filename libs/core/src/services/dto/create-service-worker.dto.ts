export class CreateServiceWorkerDto {
  public workerService: WorkerService[];
}

export class WorkerService {
  public worker: number;
  public service: number;
  public priorityType: string;
  public status: string;
}
