import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkerDto } from '@core/workers/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { WorkersService } from '@core/workers/workers.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';
import { UserAuthInterface } from '@core/auth/userAuth.interface';

@Controller('api/workers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @Roles('Worker', 'Admin')
  create(@Body() createWorkerDto: CreateWorkerDto) {
    createWorkerDto['status'] = 'Pending';
    return this.workersService.create(createWorkerDto);
  }

  // @Get()
  // @Roles('Worker')
  // findAll() {
  //   return this.workersService.findAll();
  // }

  @Get()
  @Roles('Worker', 'Admin')
  findOne(@Request() req: UserAuthInterface) {
    return this.workersService.findOne(+req.user.id);
  }

  // @Patch(':id')
  // @Roles('Worker')
  // update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
  //   return this.workersService.update(+id, updateWorkerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workersService.remove(+id);
  // }
}
