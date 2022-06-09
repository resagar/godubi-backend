import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
