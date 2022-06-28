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
  CommentsService,
  CreateCommentDto,
  UpdateCommentDto,
} from '@core/posts/comments';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';

@Controller('api/posts/comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Roles('Worker')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @Roles('Worker')
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @Roles('Worker')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Worker')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}
