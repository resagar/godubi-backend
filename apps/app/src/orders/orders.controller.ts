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
import { CreateOrderDto, OrdersService, UpdateOrderDto } from '@core/orders';
import { UserAuthInterface } from '@core/auth/userAuth.interface';
import { GetOrdersQueryDto } from '@core/orders/dto/get-orders-query.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Controller('api/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
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
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req: UserAuthInterface,
  ) {
    return this.ordersService.update(+id, updateOrderDto, req.user.id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
