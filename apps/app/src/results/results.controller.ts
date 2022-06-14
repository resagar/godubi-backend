import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateResultDto, UpdateResultDto } from '@core/results/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ResultsService } from '@core/results/results.service';

@Controller('api/results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(+id, updateResultDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.resultsService.remove(+id);
  // }
}
