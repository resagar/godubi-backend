import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MeetsService } from '@core/meets/meets.service';
import { CreateMeetDto } from '@core/meets/dto/create-meet.dto';
import { UpdateMeetDto } from '@core/meets/dto/update-meet.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UserAuthInterface } from '@core/auth/userAuth.interface';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/meets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}

  @Post()
  @Roles('worker')
  create(@Body() createMeetDto: CreateMeetDto) {
    return this.meetsService.create(createMeetDto);
  }

  @Get()
  @Roles('worker')
  findAll(@Request() req: UserAuthInterface) {
    return this.meetsService.findAll(+req.user.id);
  }

  @Get(':id')
  @Roles('worker')
  findOne(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.meetsService.findOne(+id, +req.user.id);
  }

  @Patch(':id')
  @Roles('worker')
  update(
    @Param('id') id: string,
    @Request() req: UserAuthInterface,
    @Body() updateMeetDto: UpdateMeetDto,
  ) {
    return this.meetsService.update(+id, +req.user.id, updateMeetDto);
  }

  @Delete(':id')
  @Roles('worker')
  remove(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.meetsService.remove(+id, +req.user.id);
  }
}
