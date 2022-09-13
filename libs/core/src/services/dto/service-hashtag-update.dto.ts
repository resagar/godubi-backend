import { PartialType } from '@nestjs/mapped-types';
import { HashtagService } from './create-service-hashtag.dto';

export class ServiceHashtagUpdateDto extends PartialType(HashtagService) {}
