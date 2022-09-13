import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from '@core/boards/worker/boards.service';
import { CreateBoardDto } from '@core/boards/dto/create-board.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UserAuthInterface } from '@core/auth/userAuth.interface';

@Controller('api/boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(@Request() { user: { id } }: UserAuthInterface) {
    return this.boardsService.findAll(+id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() { user: { id: userId } }: UserAuthInterface,
  ) {
    return this.boardsService.findOne(+id, +userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() { user: { id: userId } }: UserAuthInterface,
    @Body('status') status: string,
    @Body('description') description: string,
  ) {
    return this.boardsService.update(+id, userId, status, description);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boardsService.remove(+id);
  // }
}
