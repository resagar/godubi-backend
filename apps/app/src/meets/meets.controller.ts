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

@Controller('api/meets')
@UseGuards(JwtAuthGuard)
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}

  @Post()
  create(@Body() createMeetDto: CreateMeetDto) {
    return this.meetsService.create(createMeetDto);
  }

  @Get()
  findAll(@Request() req: UserAuthInterface) {
    return this.meetsService.findAll(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.meetsService.findOne(+id, +req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: UserAuthInterface,
    @Body() updateMeetDto: UpdateMeetDto,
  ) {
    return this.meetsService.update(+id, +req.user.id, updateMeetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.meetsService.remove(+id, +req.user.id);
  }
}
