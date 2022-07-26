import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { CreateServiceHashtagDto } from '@core/services/dto/create-service-hashtag.dto';
import { CreateServiceItemDto } from '@core/services/dto/create-service-item.dto';
import { CreateServiceResultDto } from '@core/services/dto/create-service-result.dto';

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
    @Body()
    createDto:
      | CreateServiceDto
      | CreateServiceWorkerDto
      | CreateServiceHashtagDto
      | CreateServiceItemDto
      | CreateServiceResultDto,
    @Request() req: UserAuthInterface,
  ) {
    if (createDto['workerService'] != undefined) {
      const user: User[] = await this.usersService.findAll(req.user.id);
      const createWorkerServiceDto: CreateServiceWorkerDto = <
        CreateServiceWorkerDto
      >createDto;
      createWorkerServiceDto.workerService.map(
        (workerService) => (workerService.worker = user[0].worker.id),
      );
      return await this.servicesService.createWorkerService(
        createWorkerServiceDto,
      );
    }
    if (createDto['hashtagService'] != undefined)
      return this.servicesService.createHashtagService(
        <CreateServiceHashtagDto>createDto,
      );
    if (createDto['itemService'] != undefined)
      return this.servicesService.createItemService(
        <CreateServiceItemDto>createDto,
      );
    if (createDto['resultService'] != undefined)
      return this.servicesService.createResultService(
        <CreateServiceResultDto>createDto,
      );
    return await this.servicesService.create(createDto);
  }

  @Get()
  @Roles('worker')
  findAll(@Query('highlight') highlight?: number | undefined) {
    return this.servicesService.findAll(highlight);
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
