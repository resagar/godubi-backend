import { Injectable } from '@nestjs/common';
import { CreateInputDto, UpdateInputDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Input } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class InputsService {
  constructor(
    @InjectRepository(Input)
    private inputsRepository: Repository<Input>,
  ) {}

  async create(createInputDto: CreateInputDto) {
    const newInput = this.inputsRepository.create(createInputDto);
    await this.inputsRepository.save(newInput);
    return newInput;
  }

  async findAll() {
    return await this.inputsRepository.find({
      relations: {
        options: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.inputsRepository.findOne({
      relations: {
        options: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updateInputDto: UpdateInputDto) {
    return await this.inputsRepository.update(id, updateInputDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} input`;
  // }
}
