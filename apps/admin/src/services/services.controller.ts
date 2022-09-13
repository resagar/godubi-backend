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
import { ServicesService } from '@core/services/admin/services.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';
import { CreateServiceHashtagDto } from '@core/services/dto/create-service-hashtag.dto';
import { CreateServiceItemDto } from '@core/services/dto/create-service-item.dto';
import { CreateServiceResultDto } from '@core/services/dto/create-service-result.dto';
import { ServiceWorkerUpdateDto } from '@core/services/dto/service-worker-update.dto';
import { ServiceHashtagUpdateDto } from '@core/services/dto/service-hashtag-update.dto';
import { ServiceItemUpdateDto } from '@core/services/dto/service-item-update.dto';
import { ServiceResultUpdateDto } from '@core/services/dto/service-result-update.dto';

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
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Patch(':id/workers/:workerId')
  @Roles('admin')
  updateWorker(
    @Param('id') id: string,
    @Param('workerId') workerId: string,
    serviceWorkerUpdateDto: ServiceWorkerUpdateDto,
  ) {
    return this.servicesService.updateWorker(
      +id,
      +workerId,
      serviceWorkerUpdateDto,
    );
  }

  @Patch(':id/hashtags/:hashtagId')
  @Roles('admin')
  updateHashtag(
    @Param('id') id: string,
    @Param('hashtagId') hashtagId: string,
    serviceHashtagUpdateDto: ServiceHashtagUpdateDto,
  ) {
    return this.servicesService.updateHashtag(
      +id,
      +hashtagId,
      serviceHashtagUpdateDto,
    );
  }

  @Patch(':id/items/:itemId')
  @Roles('admin')
  updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    serviceItemUpdateDto: ServiceItemUpdateDto,
  ) {
    return this.servicesService.updateItem(+id, +itemId, serviceItemUpdateDto);
  }

  @Patch(':id/results/:resultId')
  @Roles('admin')
  updateResult(
    @Param('id') id: string,
    @Param('resultId') resultId: string,
    serviceResultUpdateDto: ServiceResultUpdateDto,
  ) {
    return this.servicesService.updateResult(
      +id,
      +resultId,
      serviceResultUpdateDto,
    );
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  @Delete(':id/workers/:workerId')
  @Roles('admin')
  removeWorker(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.servicesService.removeWorker(+id, +workerId);
  }

  @Delete(':id/hashtags/:hashtagId')
  @Roles('admin')
  removeHashtag(
    @Param('id') id: string,
    @Param('hashtagId') hashtagId: string,
  ) {
    return this.servicesService.removeHashtag(+id, +hashtagId);
  }

  @Delete(':id/items/:itemId')
  @Roles('admin')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.servicesService.removeItem(+id, +itemId);
  }

  @Delete(':id/results/:resultId')
  @Roles('admin')
  removeResult(@Param('id') id: string, @Param('resultId') resultId: string) {
    return this.servicesService.removeResult(+id, +resultId);
  }
}
