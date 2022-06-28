import { Injectable } from '@nestjs/common';
import {
  CreateServiceDto,
  CreateServiceWorkerDto,
  UpdateServiceDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Service } from './entities/service.entity';
import { ServiceWorker } from './entities/service-worker.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(ServiceWorker)
    private serviceWorkerRepository: Repository<ServiceWorker>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const newService = this.servicesRepository.create(createServiceDto);
    await this.servicesRepository.save(newService);
    return newService;
  }

  async createWorkerService(createServiceWorkerDto: CreateServiceWorkerDto) {
    const { workerService } = createServiceWorkerDto;
    const newWorkerService = this.serviceWorkerRepository.create(workerService);
    await this.serviceWorkerRepository.save(newWorkerService);
    return newWorkerService;
  }

  async findAll() {
    return await this.servicesRepository.find({
      order: {
        priority: 'ASC',
      },
      relations: {
        category: true,
        hashtags: true,
        items: true,
        inputs: {
          options: true,
        },
        workers: {
          user: true,
        },
        portfolios: true,
        results: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.servicesRepository.findOne({
      relations: {
        category: true,
        hashtags: true,
        items: true,
        inputs: {
          options: true,
        },
        workers: {
          user: true,
        },
        results: true,
        portfolios: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneByCategoryId(id: number) {
    return await this.servicesRepository.find({
      relations: {
        category: true,
        hashtags: true,
        items: true,
        inputs: {
          options: true,
        },
        workers: {
          user: true,
        },
        results: true,
        portfolios: true,
      },
      where: {
        category: {
          id,
        },
      },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.servicesRepository.update(id, updateServiceDto);
  }

  async findAllBySearch(search: string) {
    return await this.servicesRepository.find({
      where: {
        name: Like(search),
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} service`;
  // }
}
