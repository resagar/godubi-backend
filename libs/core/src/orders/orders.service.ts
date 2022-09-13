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
import { Worker } from '@core/workers/entities/worker.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderChangeStatusEvent } from '@core/orders/events/order-change-status.event';
import { AddWorkerInOrderEvent } from './events/add-worker-in-order.event';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(InputOrder)
    private inputsOrdersRepository: Repository<InputOrder>,
    @InjectRepository(WorkerOrder)
    private workersOrdersRepository: Repository<WorkerOrder>,
    private eventEmitter: EventEmitter2,
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
    workerOrder.map((workerOrder) =>
      this.eventEmitter.emit(
        'order.add.worker',
        new AddWorkerInOrderEvent(workerOrder.order.id, workerOrder.worker.id),
      ),
    );
    return newWorkerOrder;
  }

  async findAll(
    limit?: number | undefined,
    where?: FindOptionsWhere<Order> | undefined,
  ) {
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
      take: limit ?? null,
    });
    orders.map((order) => {
      order.user?.transformAvatarBufferToString();
      order.workerOrders.map((worker) =>
        worker.worker.user?.transformAvatarBufferToString(),
      );
      order.post.map((post) => {
        post.user?.transformAvatarBufferToString();
        post.comments.map((comment) =>
          comment.user?.transformAvatarBufferToString(),
        );
      });
    });
    return orders;
  }

  async findOne(where?: FindOptionsWhere<Order> | undefined) {
    const order: Order = await this.ordersRepository.findOne({
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

    order.user?.transformAvatarBufferToString();
    order.workerOrders.map((worker) =>
      worker.worker.user?.transformAvatarBufferToString(),
    );
    order.post.map((post) => {
      post.user?.transformAvatarBufferToString();
      post.comments.map((comment) =>
        comment.user?.transformAvatarBufferToString(),
      );
    });
    return order;
  }

  async getUserFromNotification(orderId: number) {
    return await this.ordersRepository.findOne({
      relations: {
        workerOrders: {
          worker: {
            user: true,
          },
        },
        user: true,
      },
      where: {
        id: orderId,
      },
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
    orderId: number,
    userId: number,
  ) {
    await this.ordersRepository.update(criteria, updateOrderDto);
    if (updateOrderDto['orderStatus'] !== undefined)
      this.eventEmitter.emit(
        'order.change.status',
        new OrderChangeStatusEvent(orderId, userId),
      );
    return;
  }

  async updateInput(id: number, inputId: number) {
    return await this.inputsOrdersRepository.update(
      {
        order: {
          id,
        },
        input: {
          id: inputId,
        },
      },
      { order: { id }, input: { id: inputId } },
    );
  }

  async updateWorkerOrder(id: number, workerId: number) {
    return await this.workersOrdersRepository.update(
      {
        order: {
          id,
        },
        worker: {
          id: workerId,
        },
      },
      { order: { id }, worker: { id: workerId } },
    );
  }

  async updateWorker(
    id: number,
    userId: number,
    updateOrderDto: UpdateOrderDto | UpdateOrderWorkerDto | UpdateOrderAdminDto,
  ) {
    const queryWorkerOrder = this.workersOrdersRepository
      .createQueryBuilder()
      .select(['workers_id'])
      .where('orders_id = :orderId')
      .andWhere((q) => {
        const subQuery = q
          .subQuery()
          .select('id')
          .from(Worker, 'worker')
          .where('worker.users_id = :userId')
          .getQuery();
        return `workers_id = ${subQuery}`;
      });

    await this.ordersRepository
      .createQueryBuilder()
      .update()
      .set(updateOrderDto)
      .where('id = :orderId')
      .andWhere(`EXISTS (${queryWorkerOrder.getQuery()})`)
      .setParameter('orderId', id)
      .setParameter('userId', userId)
      .execute();

    if (updateOrderDto['orderStatus'] !== undefined)
      this.eventEmitter.emit(
        'order.change.status',
        new OrderChangeStatusEvent(id, userId),
      );
    return;
  }

  async remove(id: number) {
    return await this.ordersRepository.delete(id);
  }

  async removeInput(id: number, inputId: number) {
    return await this.inputsOrdersRepository.delete({
      order: {
        id,
      },
      input: {
        id: inputId,
      },
    });
  }

  async removeOrderWorker(id: number, workerId: number) {
    return await this.workersOrdersRepository.delete({
      order: {
        id,
      },
      worker: {
        id: workerId,
      },
    });
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
