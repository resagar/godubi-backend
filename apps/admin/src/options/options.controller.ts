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
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/options')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.optionsService.findAll();
  }

  @Get(':id')
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.optionsService.remove(+id);
  // }
}
