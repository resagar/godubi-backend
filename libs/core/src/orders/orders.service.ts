import { Injectable } from '@nestjs/common';
import {
  CreateInputOrderDto,
  CreateOrderDto,
  UpdateOrderAdminDto,
  UpdateOrderDto,
  UpdateOrderWorkerDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Not, ObjectID, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { InputOrder } from './entities/input-order.entity';
import { WorkerOrder } from '@core/orders/entities/worker-order.entity';
import { CreateWorkerOrderDto } from '@core/orders/dto/create-worker-order.dto';
import { OrderTotals } from './dto/get-totals-order.dto';

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

  async findAll(limit = 10, where?: FindOptionsWhere<Order> | undefined) {
    const orders: Order[] = await this.ordersRepository.find({
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
      take: limit,
    });
    orders.map((order) => {
      order?.user.transformAvatarBufferToString();
      order?.workerOrders.map((worker) =>
        worker?.worker.user.transformAvatarBufferToString(),
      );
      order?.post.map((post) => {
        post?.user.transformAvatarBufferToString();
        post?.comments.map((comment) =>
          comment?.user.transformAvatarBufferToString(),
        );
      });
    });
    return orders;
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

  async getTotalOrders(userId: number) {
    const totalOrders = await this.ordersRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    });
    const totalOrdersPending = await this.ordersRepository.count({
      where: {
        user: {
          id: userId,
        },
        orderStatus: 'Pending',
      },
    });
    const totalOrdersDone = await this.ordersRepository.count({
      where: {
        user: {
          id: userId,
        },
        orderStatus: In(['Completed', 'Done', 'Complete']),
      },
    });
    const totalOrdersCancel = await this.ordersRepository.count({
      where: {
        user: {
          id: userId,
        },
        orderStatus: In(['Cancel', 'Canceled']),
      },
    });
    const totalOrdersInProgress = await this.ordersRepository.count({
      where: {
        user: {
          id: userId,
        },
        orderStatus: 'In Progress',
      },
    });
    const orders = await this.ordersRepository.find({
      select: { orderCost: true },
      where: {
        user: {
          id: userId,
        },
        orderStatus: Not(In(['Cancel', 'Canceled'])),
      },
    });
    const totalAmountInOrders = orders
      .map((order) => order.orderCost)
      .reduce((p, c) => p + c);

    return new OrderTotals(
      totalOrders,
      totalOrdersPending,
      totalOrdersDone,
      totalOrdersCancel,
      totalOrdersInProgress,
      totalAmountInOrders,
    );
  }
}

// {
//   "totalOrders": 49,
//   "totalOrdersPending": 48,
//   "totalOrdersDone": 0,
//   "totalOrdersCancel": 0,
//   "totalOrdersInProgress": 1,
//   "totalAmountInOrders": 1600
// }
