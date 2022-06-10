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
import {
  CategoriesService,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@core/categories';
import { GetCategoriesQueryDto } from '@core/categories/dto/get-categories-query.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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
