import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from '@core/portfolio/dto/create-portfolio.dto';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Portfolio } from '@core/portfolio/entities/portfolio.entity';
import { UpdatePortfolioDto } from '@core/portfolio/dto/update-portfolio.dto';
import { PortfolioService as PortfolioServiceCore } from '@core/portfolio/portfolio.service';

@Injectable()
export class PortfolioService {
  constructor(private portfolioServiceCore: PortfolioServiceCore) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioServiceCore.create(createPortfolioDto);
  }

  async findAll() {
    const options: FindManyOptions<Portfolio> = {
      relations: {
        service: true,
      },
    };
    return await this.portfolioServiceCore.findAll(options);
  }

  async findOne(id: number) {
    const options: FindOneOptions<Portfolio> = {
      relations: {
        service: true,
      },
      where: {
        id,
      },
    };
    return await this.portfolioServiceCore.findOne(options);
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return await this.portfolioServiceCore.update(id, updatePortfolioDto);
  }
}
