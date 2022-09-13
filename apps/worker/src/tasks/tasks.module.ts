import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksModule as TasksCoreModule } from '@core/tasks/tasks.module';

@Module({
  imports: [TasksCoreModule],
  controllers: [TasksController],
})
export class TasksModule {}
