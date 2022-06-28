import { Injectable } from '@nestjs/common';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
  UpdateOrderWorkerDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { InputOrder } from './entities/input-order.entity';
import { WorkerOrder } from '@core/orders/entities/worker-order.entity';
import { CreateWorkerOrderDto } from '@core/orders/dto/create-worker-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(InputOrder)
    private inputsOrdersRepository: Repository<InputOrder>,
    @InjectRepository(WorkerOrder)
    private workersOrdersRepository: Repository<WorkerOrder>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create(createOrderDto);
    await this.ordersRepository.save(newOrder);
    return newOrder;
  }

  async createInputOrder(createInputOrderDto: CreateInputOrderDto) {
    const { inputOrder } = createInputOrderDto;
    const newInputOrder = this.inputsOrdersRepository.create(inputOrder);
    await this.inputsOrdersRepository.save(newInputOrder);
    return newInputOrder;
  }

  async createWorkerOrder(createWorkerOrderDto: CreateWorkerOrderDto) {
    const { workerOrder } = createWorkerOrderDto;
    const newWorkerOrder = this.workersOrdersRepository.create(workerOrder);
    await this.workersOrdersRepository.save(newWorkerOrder);
    return newWorkerOrder;
  }

  async findAll(where: FindOptionsWhere<Order>) {
    return await this.ordersRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        service: true,
        workers: {
          user: true,
        },
        inputs: {
          options: true,
        },
        post: {
          user: true,
          comments: {
            user: true,
          },
        },
      },
      where,
    });
  }

  async findOne(where: FindOptionsWhere<Order>) {
    return await this.ordersRepository.findOne({
      relations: {
        service: true,
        workers: {
          user: true,
        },
        inputs: {
          options: true,
        },
        post: {
          user: true,
          comments: {
            user: true,
          },
        },
      },
      where,
    });
  }

  async update(
    where: FindOptionsWhere<Order>,
    updateOrderDto: UpdateOrderDto | UpdateOrderWorkerDto,
  ) {
    return await this.ordersRepository.update(where, updateOrderDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
