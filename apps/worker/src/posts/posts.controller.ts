import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '@core/posts/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { PostsService } from '@core/posts/posts.service';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';

@Controller('api/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles('Worker')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Roles('Worker')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles('Worker')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Worker')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
