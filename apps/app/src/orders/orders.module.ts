import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersModule as OrdersModuleCore } from '@core/orders/orders.module';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  imports: [OrdersModuleCore],
  providers: [OrdersService],
})
export class OrdersModule {}
