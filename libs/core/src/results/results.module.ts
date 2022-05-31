import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
