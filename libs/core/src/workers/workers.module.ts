import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  providers: [WorkersService],
  exports: [WorkersService],
})
export class WorkersModule {}
