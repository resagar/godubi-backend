import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { GetCategoriesQueryDto } from '@core/categories/dto/get-categories-query.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ServicesService } from '@core';
import { CategoriesService } from '@core/categories/categories.service';
import { CreateCategoryDto } from '@core/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@core/categories/dto/update-category.dto';

@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: GetCategoriesQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/services')
  findServicesByCategoryId(@Param('id') id: string) {
    return this.servicesService.findOneByCategoryId(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
