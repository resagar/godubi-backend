import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InputOrder } from '@core/orders/entities/input-order.entity';
import { WorkerOrder } from '@core/orders/entities/worker-order.entity';
import { Worker } from '@core/workers/entities/worker.entity';
import { NotificationsModule } from '@core/notifications/notifications.module';
import { OrderChangeStatusListener } from './listeners/order-change-status.listener';
import { AddWorkerInOrderListener } from './listeners/add-worker-in-order.listener';
import { WorkersModule } from '@core/workers/workers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, InputOrder, WorkerOrder, Worker]),
    NotificationsModule,
    WorkersModule,
  ],
  providers: [
    OrdersService,
    OrderChangeStatusListener,
    AddWorkerInOrderListener,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
