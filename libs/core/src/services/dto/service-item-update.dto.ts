import { PartialType } from '@nestjs/mapped-types';
import { ItemService } from './create-service-item.dto';

export class ServiceItemUpdateDto extends PartialType(ItemService) {}
