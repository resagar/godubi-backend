import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateInputDto, UpdateInputDto } from '@core/inputs/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { InputsService } from '@core/inputs/inputs.service';

@Controller('api/inputs')
@UseGuards(JwtAuthGuard)
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post()
  create(@Body() createInputDto: CreateInputDto) {
    return this.inputsService.create(createInputDto);
  }

  @Get()
  findAll() {
    return this.inputsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inputsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInputDto: UpdateInputDto) {
    return this.inputsService.update(+id, updateInputDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inputsService.remove(+id);
  // }
}
