import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Like, Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from '@core/categories/dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(createCategoryDto);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async findAll(query: GetCategoriesQueryDto) {
    const categories = await this.categoriesRepository.find({
      order: {
        priority: 'ASC',
      },
      relations: {
        hashtags: true,
        services: true,
      },
      where: {
        idParent: query.parent_id ?? IsNull(),
        highlight: query.highlight ?? In([0, 1]),
      },
      take: query.limit_categories ?? null,
    });
    if (query.limit_services) {
      categories.map((category) => {
        category.services = category.services.slice(0, query.limit_services);
      });
    }

    return categories;
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOne({
      relations: {
        hashtags: true,
        services: true,
      },
      where: {
        id: id,
      },
    });
  }

  async findAllBySearch(search: string) {
    return await this.categoriesRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoriesRepository.delete(id);
  }
}
