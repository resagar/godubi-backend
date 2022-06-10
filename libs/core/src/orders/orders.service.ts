import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create(createOrderDto);
    await this.ordersRepository.save(newOrder);
    return newOrder;
  }

  async findAll(userId: number, query: GetOrdersQueryDto) {
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
      where: {
        user: {
          id: userId,
        },
        service: {
          id: query.serviceId,
        },
        orderStatus: query.orderStatus,
        createdAt: query.created,
        workers: {
          user: {
            id: query.worker,
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
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
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
    return await this.ordersRepository.update(
      {
        id,
        user: {
          id: userId,
        },
      },
      updateOrderDto,
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
