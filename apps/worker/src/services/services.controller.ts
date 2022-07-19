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
import {
  CreateServiceDto,
  CreateServiceWorkerDto,
  UpdateServiceDto,
} from '@core/services/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ServicesService } from '@core/services/services.service';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';
import { UserAuthInterface } from '@core/auth/userAuth.interface';
import { User } from '@core/users/entities/user.entity';
import { UsersService } from '@core/users/users.service';

@Controller('api/services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Roles('worker')
  async create(
    @Body() createServiceDto: CreateServiceDto | CreateServiceWorkerDto,
    @Request() req: UserAuthInterface,
  ) {
    if (createServiceDto['workerService'] != undefined) {
      const user: User[] = await this.usersService.findAll(req.user.id);
      const createWorkerServiceDto: CreateServiceWorkerDto = <
        CreateServiceWorkerDto
      >createServiceDto;
      createWorkerServiceDto.workerService.map(
        (workerService) => (workerService.worker = user[0].worker.id),
      );
      return await this.servicesService.createWorkerService(
        createWorkerServiceDto,
      );
    }
    return await this.servicesService.create(createServiceDto);
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
