import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}