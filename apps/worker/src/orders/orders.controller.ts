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
  CreateInputOrderDto,
  CreateOrderDto,
  UpdateOrderWorkerDto,
} from '@core/orders/dto';
import { UserAuthInterface } from '@core/auth/userAuth.interface';
import { GetOrdersQueryDto } from '@core/orders/dto/get-orders-query.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { CreateWorkerOrderDto } from '@core/orders/dto/create-worker-order.dto';
import { OrdersService } from './orders.service';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';

@Controller('api/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('worker')
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
  @Roles('worker')
  findAll(
    @Query() query: GetOrdersQueryDto,
    @Request() req: UserAuthInterface,
  ) {
    return this.ordersService.findAll(req.user.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.ordersService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @Roles('worker')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderWorkerDto,
    @Request() req: UserAuthInterface,
  ) {
    return this.ordersService.update(+id, updateOrderDto, req.user.id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
