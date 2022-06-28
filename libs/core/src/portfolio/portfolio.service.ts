import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectID,
  Repository,
} from 'typeorm';
import { Portfolio } from '@core/portfolio/entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const newPortfolio = this.portfolioRepository.create(createPortfolioDto);
    await this.portfolioRepository.save(newPortfolio);
    return newPortfolio;
  }

  async findAll(options: FindManyOptions<Portfolio>) {
    return await this.portfolioRepository.find(options);
  }

  async findOne(options: FindOneOptions<Portfolio>) {
    return await this.portfolioRepository.findOne(options);
  }

  async update(
    criteria:
      | string
      | number
      | FindOptionsWhere<Portfolio>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioRepository.update(criteria, updatePortfolioDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} portfolio`;
  // }
}
