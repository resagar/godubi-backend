import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioModule as PortfolioModuleCore } from '@core/portfolio/portfolio.module';

@Module({
  imports: [PortfolioModuleCore],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
