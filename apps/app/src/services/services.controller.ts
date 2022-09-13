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
import {
  CreateServiceDto,
  CreateServiceWorkerDto,
  UpdateServiceDto,
} from '@core/services/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ServicesService } from '@core/services/services.service';
import { CreateServiceHashtagDto } from '@core/services/dto/create-service-hashtag.dto';
import { CreateServiceItemDto } from '@core/services/dto/create-service-item.dto';
import { CreateServiceResultDto } from '@core/services/dto/create-service-result.dto';

@Controller('api/services')
@UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @Body()
    createDto:
      | CreateServiceDto
      | CreateServiceWorkerDto
      | CreateServiceHashtagDto
      | CreateServiceItemDto
      | CreateServiceResultDto,
  ) {
    if (createDto['workerService'] != undefined)
      return this.servicesService.createWorkerService(
        <CreateServiceWorkerDto>createDto,
      );
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
    return this.servicesService.create(<CreateServiceDto>createDto);
  }

  @Get()
  findAll(
    @Query('limit') limit = '10',
    @Query('skip') skip = '0',
    @Query('name') name: string,
    @Query('slug') slug: string,
    @Query('priority') priority: string,
    @Query('created') created: Date,
    @Query('highlight') highlight?: string | undefined,
  ) {
    return this.servicesService.findAll(
      +limit,
      +skip,
      name,
      slug,
      +priority,
      created,
      +highlight,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.servicesService.remove(+id);
  // }
}
