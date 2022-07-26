import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InputOrder } from '@core/orders/entities/input-order.entity';
import { WorkerOrder } from '@core/orders/entities/worker-order.entity';
import { Worker } from '@core/workers/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, InputOrder, WorkerOrder, Worker])],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
