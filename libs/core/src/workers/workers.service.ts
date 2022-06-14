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
    return await this.workersRepository.find({
      relations: {
        user: true,
        services: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.workersRepository.findOne({
      relations: {
        user: true,
        services: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return await this.workersRepository.update(id, updateWorkerDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} worker`;
  // }
}
