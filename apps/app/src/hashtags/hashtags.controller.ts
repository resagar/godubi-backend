import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateHashtagDto,
  HashtagsService,
  UpdateHashtagDto,
} from '@core/hashtags';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Controller('api/hashtags')
@UseGuards(JwtAuthGuard)
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post()
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagsService.create(createHashtagDto);
  }

  @Get()
  findAll() {
    return this.hashtagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hashtagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagsService.update(+id, updateHashtagDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hashtagsService.remove(+id);
  // }
}
