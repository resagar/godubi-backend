import { Injectable } from '@nestjs/common';
import { CreateHashtagDto, UpdateHashtagDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagsRepository: Repository<Hashtag>,
  ) {}

  async create(createHashtagDto: CreateHashtagDto) {
    const newHashtag = this.hashtagsRepository.create(createHashtagDto);
    await this.hashtagsRepository.save(newHashtag);
    return newHashtag;
  }

  async findAll(limit: number, skip: number, name: string, created: Date) {
    const where: FindOptionsWhere<Hashtag> = {};
    name ? (where.name = name) : null;
    created ? (where.createdAt = created) : null;
    return await this.hashtagsRepository.find({
      relations: {
        categories: true,
        services: true,
      },
      where,
      take: limit,
      skip,
    });
  }

  async findOne(id: number) {
    return await this.hashtagsRepository.findOne({
      relations: {
        categories: true,
        services: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return await this.hashtagsRepository.update(id, updateHashtagDto);
  }

  async findAllBySearch(search: string) {
    return await this.hashtagsRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  async remove(id: number) {
    return await this.hashtagsRepository.delete(id);
  }
}
