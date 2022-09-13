import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsService as BoardsServiceAdmin } from './admin/boards.service';
import { BoardsService as BoardsServiceWorker } from './worker/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService, BoardsServiceAdmin, BoardsServiceWorker],
  exports: [
    BoardsModule,
    BoardsService,
    BoardsServiceAdmin,
    BoardsServiceWorker,
  ],
})
export class BoardsModule {}
