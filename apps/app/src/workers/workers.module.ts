import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersModule as WorkersModuleCore } from '@core';

@Module({
  imports: [WorkersModuleCore],
  controllers: [WorkersController],
})
export class WorkersModule {}
