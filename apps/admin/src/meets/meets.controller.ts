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
import { MeetsService } from '@core/meets/admin/meets.service';
import { CreateMeetDto } from '@core/meets/dto/create-meet.dto';
import { UpdateMeetDto } from '@core/meets/dto/update-meet.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/meets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}

  @Post()
  @Roles('admin')
  create(@Body() createMeetDto: CreateMeetDto) {
    return this.meetsService.create(createMeetDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.meetsService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.meetsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateMeetDto: UpdateMeetDto) {
    return this.meetsService.update(+id, updateMeetDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.meetsService.remove(+id);
  }
}
