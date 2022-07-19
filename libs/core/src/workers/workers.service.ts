import { Injectable } from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    const workers: Worker[] = await this.workersRepository.find({
      relations: {
        user: true,
        services: true,
        portfolios: true,
      },
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
      },
      where: { id },
    });
    worker?.user?.transformAvatarBufferToString();
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return await this.workersRepository.update(id, updateWorkerDto);
  }

  async remove(id: number) {
    return await this.workersRepository.delete(id);
  }
}
