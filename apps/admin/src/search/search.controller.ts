import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { CategoriesService } from '@core/categories/categories.service';
import { HashtagsService } from '@core/hashtags/hashtags.service';
import { ServicesService } from '@core/services/services.service';
import { UsersService } from '@core/users/users.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/search')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SearchController {
  constructor(
    private readonly categoriesServices: CategoriesService,
    private readonly hashtagsService: HashtagsService,
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Roles('Admin')
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
