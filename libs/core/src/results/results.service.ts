import { Injectable } from '@nestjs/common';
import { CreateResultDto, UpdateResultDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private ordersRepository: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const newResult = this.ordersRepository.create(createResultDto);
    await this.ordersRepository.save(newResult);
    return newResult;
  }

  async findAll() {
    return await this.ordersRepository.find({
      relations: {
        services: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOne({
      relations: {
        services: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    return await this.ordersRepository.update(id, updateResultDto);
  }

  // async remove(id: number) {
  //   return `This action removes a #${id} result`;
  // }
}
