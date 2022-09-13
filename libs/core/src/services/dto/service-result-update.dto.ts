import { PartialType } from '@nestjs/mapped-types';
import { ResultService } from './create-service-result.dto';

export class ServiceResultUpdateDto extends PartialType(ResultService) {}
