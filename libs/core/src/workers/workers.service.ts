import { Injectable } from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const newWorker = this.workersRepository.create(createWorkerDto);
    await this.workersRepository.save(newWorker);
    return newWorker;
  }

  async findAll(limit: number, skip: number, status: string) {
    const where: FindOptionsWhere<Worker> = {};
    status ? (where.status = status) : null;

    const workers: Worker[] = await this.workersRepository.find({
      relations: {
        user: true,
        services: true,
        portfolios: true,
        workerOrders: {
          order: true,
        },
      },
      where,
      take: limit,
      skip,
    });
    workers.map((worker) => worker?.user?.transformAvatarBufferToString());
    return workers;
  }

  async findOne(id: number) {
    const worker: Worker = await this.workersRepository.findOne({
      relations: {
        user: true,
        services: true,
        portfolios: true,
        workerOrders: {
          order: true,
        },
      },
      where: { id },
    });
    worker?.user?.transformAvatarBufferToString();
    return worker;
  }

  async findAllBySearch(search: string) {
    const workers: Worker[] = await this.workersRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          username: Like(`%${search}%`),
        },
      },
    });
    workers.map((worker) => worker?.user?.transformAvatarBufferToString());
    return workers;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return await this.workersRepository.update(id, updateWorkerDto);
  }

  async remove(id: number) {
    return await this.workersRepository.delete(id);
  }
  async getUserFromNotification(workerId: number) {
    return this.workersRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: workerId,
      },
    });
  }
}
