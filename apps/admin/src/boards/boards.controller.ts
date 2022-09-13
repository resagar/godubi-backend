import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardsService } from '@core/boards/admin/boards.service';
import { CreateBoardDto } from '@core/boards/dto/create-board.dto';
import { UpdateBoardDto } from '@core/boards/dto/update-board.dto';
import { GetFilterTasksDto } from '@core/boards/dto/get-filter-tasks.dto';

@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(@Query() getFilterTasksDto: GetFilterTasksDto) {
    return this.boardsService.findAll(getFilterTasksDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
