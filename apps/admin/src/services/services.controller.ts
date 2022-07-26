import {
  Body,
  Controller,
  Delete,
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
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';
import { CreateServiceHashtagDto } from '@core/services/dto/create-service-hashtag.dto';
import { CreateServiceItemDto } from '@core/services/dto/create-service-item.dto';
import { CreateServiceResultDto } from '@core/services/dto/create-service-result.dto';

@Controller('api/services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles('admin')
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
  @Roles('admin')
  findAll(@Query('highlight') highlight?: number | undefined) {
    return this.servicesService.findAll(highlight);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  @Delete('workers/:id/:workerId')
  @Roles('admin')
  removeWorker(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.servicesService.removeWorker(+id, +workerId);
  }

  @Delete('hashtags/:id/:hashtagId')
  @Roles('admin')
  removeHashtag(
    @Param('id') id: string,
    @Param('hashtagId') hashtagId: string,
  ) {
    return this.servicesService.removeHashtag(+id, +hashtagId);
  }

  @Delete('items/:id/:itemId')
  @Roles('admin')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.servicesService.removeItem(+id, +itemId);
  }

  @Delete('results/:id/:resultId')
  @Roles('admin')
  removeResult(@Param('id') id: string, @Param('resultId') resultId: string) {
    return this.servicesService.removeResult(+id, +resultId);
  }
}
