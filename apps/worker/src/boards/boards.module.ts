import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsModule as BoardsCoreModule } from '@core/boards/boards.module';

@Module({
  imports: [BoardsCoreModule],
  controllers: [BoardsController],
})
export class BoardsModule {}
