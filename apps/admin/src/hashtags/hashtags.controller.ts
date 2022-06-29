import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateHashtagDto, UpdateHashtagDto } from '@core/hashtags/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { HashtagsService } from '@core/hashtags/hashtags.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/hashtags')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagsService.create(createHashtagDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.hashtagsService.findAll();
  }

  @Get(':id')
  @Roles('Admin')
  findOne(@Param('id') id: string) {
    return this.hashtagsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagsService.update(+id, updateHashtagDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hashtagsService.remove(+id);
  // }
}