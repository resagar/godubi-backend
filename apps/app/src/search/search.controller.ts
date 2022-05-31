import { Body, Controller, Post } from '@nestjs/common';
import {
  CategoriesService,
  HashtagsService,
  ServicesService,
  UsersService,
} from '@core';

@Controller('api/search')
export class SearchController {
  constructor(
    private readonly categoriesServices: CategoriesService,
    private readonly hashtagsService: HashtagsService,
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async search(@Body('query') search: string) {
    const categories = await this.categoriesServices.findAllBySearch(search);
    const hashtags = await this.hashtagsService.findAllBySearch(search);
    const services = await this.servicesService.findAllBySearch(search);
    const users = await this.usersService.findAllBySearch(search);
    return {
      categories,
      hashtags,
      services,
      users,
    };
  }

  // @Get()
  // findAll() {
  //   return this.searchService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.searchService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
  //   return this.searchService.update(+id, updateSearchDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.searchService.remove(+id);
  // }
}
