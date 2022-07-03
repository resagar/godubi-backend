import { Injectable } from '@nestjs/common';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  UpdateOrderAdminDto,
  UpdateOrderDto,
  UpdateOrderWorkerDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ObjectID, Repository } from 'typeorm';

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

  async findAll(where?: FindOptionsWhere<Order> | undefined) {
    return await this.ordersRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        service: true,
        workerOrders: {
          worker: {
            user: true,
          },
        },
        inputOrders: {
          input: {
            options: true,
          },
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

  async findOne(where?: FindOptionsWhere<Order> | undefined) {
    return await this.ordersRepository.findOne({
      relations: {
        service: true,
        workerOrders: {
          worker: {
            user: true,
          },
        },
        inputOrders: {
          input: {
            options: true,
          },
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
    criteria:
      | string
      | number
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindOptionsWhere<Order>,
    updateOrderDto: UpdateOrderDto | UpdateOrderWorkerDto | UpdateOrderAdminDto,
  ) {
    return await this.ordersRepository.update(criteria, updateOrderDto);
  }

  async remove(id: number) {
    return await this.ordersRepository.delete(id);
  }
}
