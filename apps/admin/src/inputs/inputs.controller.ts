import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateInputDto, UpdateInputDto } from '@core/inputs/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { InputsService } from '@core/inputs/inputs.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/inputs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post()
  @Roles('admin')
  create(@Body() createInputDto: CreateInputDto) {
    return this.inputsService.create(createInputDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.inputsService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.inputsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateInputDto: UpdateInputDto) {
    return this.inputsService.update(+id, updateInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inputsService.remove(+id);
  }
}
