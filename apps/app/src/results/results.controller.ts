import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreateResultDto,
  ResultsService,
  UpdateResultDto,
} from '@core/results';

@Controller('api/results')
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
