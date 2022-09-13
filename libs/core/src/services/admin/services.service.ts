import { Injectable } from '@nestjs/common';
import {
  CreateServiceDto,
  CreateServiceWorkerDto,
  UpdateServiceDto,
} from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';

import { Service } from '../entities/service.entity';
import { ServiceWorker } from '../entities/service-worker.entity';
import { ServiceHashtagEntity } from '../entities/service-hashtag.entity';
import { ServiceItemEntity } from '../entities/service-item.entity';
import { ServiceResultEntity } from '../entities/service-result.entity';
import { CreateServiceHashtagDto } from '@core/services/dto/create-service-hashtag.dto';
import { CreateServiceItemDto } from '@core/services/dto/create-service-item.dto';
import { CreateServiceResultDto } from '@core/services/dto/create-service-result.dto';
import { CreateServiceResponseDto } from '@core/services/dto/create-service-response.dto';
import { Hashtag } from '@core/hashtags/entities/hashtag.entity';
import { ServiceWorkerUpdateDto } from '../dto/service-worker-update.dto';
import { ServiceItemUpdateDto } from '../dto/service-item-update.dto';
import { ServiceHashtagUpdateDto } from '../dto/service-hashtag-update.dto';
import { ServiceResultUpdateDto } from '../dto/service-result-update.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(ServiceWorker)
    private serviceWorkerRepository: Repository<ServiceWorker>,
    @InjectRepository(ServiceHashtagEntity)
    private serviceHashtagRepository: Repository<ServiceHashtagEntity>,
    @InjectRepository(ServiceItemEntity)
    private serviceItemRepository: Repository<ServiceItemEntity>,
    @InjectRepository(ServiceResultEntity)
    private serviceResultRepository: Repository<ServiceResultEntity>,
    @InjectRepository(Hashtag)
    private hashtagRepository: Repository<Hashtag>,
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

  async createHashtagService(createServiceHashtagDto: CreateServiceHashtagDto) {
    const { hashtagService } = createServiceHashtagDto;
    const newHashtagService =
      this.serviceHashtagRepository.create(hashtagService);
    await this.serviceHashtagRepository.save(newHashtagService);
    return newHashtagService;
  }

  async createItemService(createServiceItemDto: CreateServiceItemDto) {
    const { itemService } = createServiceItemDto;
    const newItemService = this.serviceItemRepository.create(itemService);
    await this.serviceItemRepository.save(newItemService);
    return newItemService;
  }

  async createResultService(createServiceResultDto: CreateServiceResultDto) {
    const { resultService } = createServiceResultDto;
    const newResultService = this.serviceResultRepository.create(resultService);
    await this.serviceResultRepository.save(newResultService);
    return newResultService;
  }

  async findAll(
    limit: number,
    skip: number,
    name: string,
    slug: string,
    priority: number,
    created: Date,
    highlight?: number,
  ) {
    const where: FindOptionsWhere<Service> = {};
    name ? (where.name = name) : null;
    priority ? (where.priority = priority) : null;
    slug ? (where.slug = slug) : null;
    created ? (where.createdAt = created) : null;
    highlight ? (where.highlight = highlight) : In([0, 1]);

    const services: Service[] = await this.servicesRepository.find({
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
      where,
      take: limit,
      skip,
    });
    services.map((service) => {
      service?.workers.map((worker) =>
        worker?.user.transformAvatarBufferToString(),
      );
    });
    return services;
  }

  async findOne(id: number) {
    const service: CreateServiceResponseDto =
      await this.servicesRepository.findOne({
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
    service?.workers.map((worker) =>
      worker?.user?.transformAvatarBufferToString(),
    );
    const hashtagsId: number[] = service?.hashtags.map((hashtag) => hashtag.id);
    const hashtags = await this.hashtagRepository.find({
      relations: {
        services: true,
      },
      where: {
        id: In(hashtagsId),
      },
    });
    service.related = hashtags
      ?.map(({ services }) => {
        return services;
      })
      ?.reduce((p, c) => p.concat(c))
      ?.filter((service) => service.id != id);
    return service;
  }

  async findOneByCategoryId(id: number, highlight?: number | undefined) {
    const services: Service[] = await this.servicesRepository.find({
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
        highlight: highlight ?? In([0, 1]),
      },
    });
    services.map((service) => {
      service?.workers.map((worker) =>
        worker?.user.transformAvatarBufferToString(),
      );
    });
    return services;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.servicesRepository.update(id, updateServiceDto);
  }

  async updateWorker(
    serviceId: number,
    workerId: number,
    serviceWorkerUpdateDto: ServiceWorkerUpdateDto,
  ) {
    return await this.serviceWorkerRepository.update(
      {
        service: serviceId,
        worker: workerId,
      },

      serviceWorkerUpdateDto,
    );
  }

  async updateHashtag(
    serviceId: number,
    hashtagId: number,
    serviceHashtagUpdateDto: ServiceHashtagUpdateDto,
  ) {
    return await this.serviceHashtagRepository.update(
      {
        service: serviceId,
        hashtag: hashtagId,
      },
      serviceHashtagUpdateDto,
    );
  }

  async updateItem(
    serviceId: number,
    itemId: number,
    serviceItemUpdateDto: ServiceItemUpdateDto,
  ) {
    return await this.serviceItemRepository.update(
      {
        service: serviceId,
        item: itemId,
      },
      serviceItemUpdateDto,
    );
  }

  async updateResult(
    serviceId: number,
    resultId: number,
    serviceResultUpdateDto: ServiceResultUpdateDto,
  ) {
    return await this.serviceResultRepository.update(
      {
        service: serviceId,
        result: resultId,
      },
      serviceResultUpdateDto,
    );
  }

  async findAllBySearch(search: string) {
    return await this.servicesRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  async remove(id: number) {
    return await this.servicesRepository.delete(id);
  }

  async removeWorker(serviceId: number, workerId: number) {
    return await this.serviceWorkerRepository.delete({
      service: serviceId,
      worker: workerId,
    });
  }

  async removeHashtag(serviceId: number, hashtagId: number) {
    return await this.serviceHashtagRepository.delete({
      service: serviceId,
      hashtag: hashtagId,
    });
  }

  async removeItem(serviceId: number, itemId: number) {
    return await this.serviceItemRepository.delete({
      service: serviceId,
      item: itemId,
    });
  }

  async removeResult(serviceId: number, resultId: number) {
    return await this.serviceResultRepository.delete({
      service: serviceId,
      result: resultId,
    });
  }
}
