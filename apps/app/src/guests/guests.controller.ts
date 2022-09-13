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
import { GuestsService } from '@core/guests/guests.service';
import { CreateGuestDto } from '@core/guests/dto/create-guest.dto';
import { UpdateGuestDto } from '@core/guests/dto/update-guest.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UserAuthInterface } from '@core/auth/userAuth.interface';

@Controller('api/guests')
@UseGuards(JwtAuthGuard)
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Get()
  findAll(@Request() req: UserAuthInterface) {
    return this.guestsService.findAll(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.guestsService.findOne(+id, +req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: UserAuthInterface,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    return this.guestsService.update(+id, +req.user.id, updateGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: UserAuthInterface) {
    return this.guestsService.remove(+id, +req.user.id);
  }
}
