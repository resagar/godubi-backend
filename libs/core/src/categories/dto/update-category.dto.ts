import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Hashtag } from '@core/hashtags';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  public hashtags: Hashtag[];
}
