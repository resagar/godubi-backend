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
    const portfolios: Portfolio[] = await this.portfolioRepository.find(
      options,
    );
    portfolios.map((porfolio) =>
      porfolio.worker.user.transformAvatarBufferToString(),
    );
    return portfolios;
  }

  async findOne(options: FindOneOptions<Portfolio>) {
    const portfolio: Portfolio = await this.portfolioRepository.findOne(
      options,
    );
    portfolio.worker.user.transformAvatarBufferToString();
    return portfolio;
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

  async remove(id: number) {
    return await this.portfolioRepository.delete(id);
  }
}
