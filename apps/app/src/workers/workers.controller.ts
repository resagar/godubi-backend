import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from '@core/workers/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { WorkersService } from '@core/workers/workers.service';

@Controller('api/workers')
@UseGuards(JwtAuthGuard)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll(
    @Query('limit') limit = '10',
    @Query('skip') skip = '0',
    @Query('status') status: string,
  ) {
    return this.workersService.findAll(+limit, +skip, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(+id, updateWorkerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workersService.remove(+id);
  // }
}
