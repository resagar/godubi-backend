import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from '@core/workers/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { WorkersService } from '@core/workers/workers.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/workers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(+id);
  }
}
