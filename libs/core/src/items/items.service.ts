import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const newItem = this.itemsRepository.create(createItemDto);
    await this.itemsRepository.save(newItem);
    return newItem;
  }

  async findAll() {
    return await this.itemsRepository.find({
      relations: {
        services: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOne({
      relations: {
        services: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return await this.itemsRepository.update(id, updateItemDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
