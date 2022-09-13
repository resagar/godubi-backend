import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  UpdateOrderAdminDto,
} from '@core/orders/dto';
import { GetOrdersQueryDto } from '@core/orders/dto/get-orders-query.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { CreateWorkerOrderDto } from '@core/orders/dto/create-worker-order.dto';
import { OrdersService } from './orders.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';
import { UserAuthInterface } from '@core/auth/userAuth.interface';

@Controller('api/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('admin')
  create(
    @Body()
    createDto: CreateOrderDto | CreateInputOrderDto | CreateWorkerOrderDto,
  ) {
    if (createDto['inputOrder'] != undefined)
      return this.ordersService.createInputOrder(
        <CreateInputOrderDto>createDto,
      );
    if (createDto['workerOrder'] != undefined)
      return this.ordersService.createWorkerOrder(
        <CreateWorkerOrderDto>createDto,
      );
    return this.ordersService.create(<CreateOrderDto>createDto);
  }

  @Get()
  @Roles('admin')
  findAll(@Query() query: GetOrdersQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateOrderAdminDto: UpdateOrderAdminDto,
    @Request() req: UserAuthInterface,
  ) {
    return this.ordersService.update(+id, updateOrderAdminDto, +req.user.id);
  }

  @Patch(':id/inputs/:inputId')
  @Roles('admin')
  updateInput(@Param('id') id: string, @Param('inputId') inputId: string) {
    return this.ordersService.updateInput(+id, +inputId);
  }

  @Delete(':id/workers/:workerId')
  @Roles('admin')
  updateWorker(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.ordersService.updateWorkerOrder(+id, +workerId);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Delete(':id/inputs/:inputId')
  @Roles('admin')
  removeInput(@Param('id') id: string, @Param('inputId') inputId: string) {
    return this.ordersService.removeInput(+id, +inputId);
  }

  @Delete(':id/workers/:workerId')
  @Roles('admin')
  removeWorker(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.ordersService.removeOrderWorker(+id, +workerId);
  }
}
