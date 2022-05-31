import { Injectable } from '@nestjs/common';
import { CreateOptionDto, UpdateOptionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionsRepository: Repository<Option>,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    const newOption = this.optionsRepository.create(createOptionDto);
    await this.optionsRepository.save(newOption);
    return newOption;
  }

  async findAll() {
    return await this.optionsRepository.find({
      relations: {
        inputs: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.optionsRepository.findOne({
      relations: {
        inputs: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    return await this.optionsRepository.update(id, updateOptionDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} option`;
  // }
}
