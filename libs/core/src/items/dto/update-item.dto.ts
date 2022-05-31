import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
