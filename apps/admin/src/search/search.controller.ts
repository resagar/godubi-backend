import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { CategoriesService } from '@core/categories/categories.service';
import { HashtagsService } from '@core/hashtags/hashtags.service';
import { ServicesService } from '@core/services/services.service';
import { WorkersService } from '@core/workers/workers.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/search')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SearchController {
  constructor(
    private readonly categoriesServices: CategoriesService,
    private readonly hashtagsService: HashtagsService,
    private readonly servicesService: ServicesService,
    private readonly workerService: WorkersService,
  ) {}

  @Get()
  @Roles('admin')
  async search(@Query('search') search: string) {
    const categories = await this.categoriesServices.findAllBySearch(search);
    const hashtags = await this.hashtagsService.findAllBySearch(search);
    const services = await this.servicesService.findAllBySearch(search);
    const workers = await this.workerService.findAllBySearch(search);
    return {
      categories,
      hashtags,
      services,
      workers,
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
