import { PartialType } from '@nestjs/mapped-types';
import { CreateInputDto } from './';

export class UpdateInputDto extends PartialType(CreateInputDto) {}
