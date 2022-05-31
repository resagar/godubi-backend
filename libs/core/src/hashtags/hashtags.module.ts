import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  providers: [HashtagsService],
  exports: [HashtagsService],
})
export class HashtagsModule {}
