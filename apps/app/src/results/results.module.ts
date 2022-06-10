import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsModule as ResultsModuleCore } from '@core';

@Module({
  imports: [ResultsModuleCore],
  controllers: [ResultsController],
})
export class ResultsModule {}
