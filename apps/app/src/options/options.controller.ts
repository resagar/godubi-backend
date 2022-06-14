import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOptionDto, UpdateOptionDto } from '@core/options/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { OptionsService } from '@core/options/options.service';

@Controller('api/options')
@UseGuards(JwtAuthGuard)
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.optionsService.remove(+id);
  // }
}
