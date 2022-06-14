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

@Controller('api/items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemsService.remove(+id);
  // }
}
