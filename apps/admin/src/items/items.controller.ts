import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from '@core/items/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { ItemsService } from '@core/items/items.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemsService.remove(+id);
  // }
}
