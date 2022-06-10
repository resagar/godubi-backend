import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersModule as OrdersModuleCore } from '@core';

@Module({
  controllers: [OrdersController],
  imports: [OrdersModuleCore],
})
export class OrdersModule {}
