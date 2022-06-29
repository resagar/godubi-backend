import { Injectable } from '@nestjs/common';
import { OrdersService as OrdersServiceCore } from '@core/orders/orders.service';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  GetOrdersQueryDto,
  UpdateOrderAdminDto,
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

  async findAll(query: GetOrdersQueryDto) {
    const where: FindOptionsWhere<Order> = {};
    query.serviceId ? (where.service = { id: query.serviceId }) : null;
    query.orderStatus ? (where.orderStatus = query.orderStatus) : null;
    query.created ? (where.createdAt = Like(query.created)) : null;
    query.worker
      ? (where.workerOrders = { worker: { id: query.worker } })
      : null;
    query.client ? (where.user = { id: query.client }) : null;
    return await this.ordersServiceCore.findAll(where);
  }

  async findOne(id: number) {
    const where: FindOptionsWhere<Order> = {
      id,
    };
    return await this.ordersServiceCore.findOne(where);
  }

  async update(id: number, updateOrderAdminDto: UpdateOrderAdminDto) {
    return await this.ordersServiceCore.update(+id, updateOrderAdminDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
