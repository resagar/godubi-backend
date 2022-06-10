import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateWorkerDto,
  UpdateWorkerDto,
  WorkersService,
} from '@core/workers';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Controller('api/workers')
@UseGuards(JwtAuthGuard)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workersService.findAll();
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
