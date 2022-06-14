import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersModule as WorkersModuleCore } from '@core/workers/workers.module';

@Module({
  imports: [WorkersModuleCore],
  controllers: [WorkersController],
})
export class WorkersModule {}
