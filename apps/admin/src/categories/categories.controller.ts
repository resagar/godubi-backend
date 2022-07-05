import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ServicesService } from '@core/services/services.service';
import { CategoriesService } from '@core/categories/categories.service';
import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from '@core/categories/dto';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Roles('admin')
  async findAll(@Query() query: GetCategoriesQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/services')
  @Roles('admin')
  findServicesByCategoryId(@Param('id') id: string) {
    return this.servicesService.findOneByCategoryId(+id);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
