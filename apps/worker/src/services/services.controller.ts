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
  CreateServiceDto,
  CreateServiceWorkerDto,
  UpdateServiceDto,
} from '@core/services/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ServicesService } from '@core/services/services.service';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';

@Controller('api/services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles('worker')
  create(@Body() createServiceDto: CreateServiceDto | CreateServiceWorkerDto) {
    if (createServiceDto['workerService'] != undefined) {
      return this.servicesService.createWorkerService(
        <CreateServiceWorkerDto>createServiceDto,
      );
    }
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @Roles('worker')
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @Roles('worker')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('worker')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.servicesService.remove(+id);
  // }
}
