import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from '@core/portfolio/dto/create-portfolio.dto';
import { UpdatePortfolioDto } from '@core/portfolio/dto/update-portfolio.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';

@Controller('api/portfolio')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @Roles('Worker')
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  @Roles('Worker')
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  @Roles('Worker')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Worker')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(+id, updatePortfolioDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portfolioService.remove(+id);
  // }
}
