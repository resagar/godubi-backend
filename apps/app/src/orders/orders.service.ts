import { Injectable } from '@nestjs/common';
import { OrdersService as OrdersServiceCore } from '@core/orders/orders.service';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  GetOrdersQueryDto,
  UpdateOrderDto,
} from '@core/orders/dto';
import { CreateWorkerOrderDto } from '@core/orders/dto/create-worker-order.dto';
import { FindOptionsWhere, Like } from 'typeorm';
import { Order } from '@core/orders/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersServiceCore: OrdersServiceCore) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.ordersServiceCore.create(createOrderDto);
  }

  async createInputOrder(createInputOrderDto: CreateInputOrderDto) {
    return this.ordersServiceCore.createInputOrder(createInputOrderDto);
  }

  async createWorkerOrder(createWorkerOrderDto: CreateWorkerOrderDto) {
    return this.ordersServiceCore.createWorkerOrder(createWorkerOrderDto);
  }

  async findAll(userId: number, query: GetOrdersQueryDto) {
    const where: FindOptionsWhere<Order> = {
      user: {
        id: userId,
      },
    };
    query.serviceId ? (where.service = { id: query.serviceId }) : null;
    query.orderStatus ? (where.orderStatus = query.orderStatus) : null;
    query.created ? (where.createdAt = Like(query.created)) : null;
    query.worker
      ? (where.workerOrders = { worker: { id: query.worker } })
      : null;
    return await this.ordersServiceCore.findAll(query.limit, where);
  }

  async findOne(id: number, userId: number) {
    const where: FindOptionsWhere<Order> = {
      id,
      user: {
        id: userId,
      },
    };
    return await this.ordersServiceCore.findOne(where);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
    const where: FindOptionsWhere<Order> = {
      id,
      user: {
        id: userId,
      },
    };
    return await this.ordersServiceCore.update(
      where,
      updateOrderDto,
      id,
      userId,
    );
  }

  async getTotalOrders(userId: number) {
    return await this.ordersServiceCore.getTotalOrders(userId);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
