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

@Controller('api/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('Admin')
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
  @Roles('Admin')
  findAll(@Query() query: GetOrdersQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(
    @Param('id') id: string,
    @Body() updateOrderAdminDto: UpdateOrderAdminDto,
  ) {
    return this.ordersService.update(+id, updateOrderAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
