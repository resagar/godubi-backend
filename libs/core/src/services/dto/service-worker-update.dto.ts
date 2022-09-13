import { PartialType } from '@nestjs/mapped-types';
import { WorkerService } from './create-service-worker.dto';

export class ServiceWorkerUpdateDto extends PartialType(WorkerService) {}
