import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '@core/portfolio/entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  providers: [PortfolioService],
  exports: [PortfolioModule, PortfolioService],
})
export class PortfolioModule {}
