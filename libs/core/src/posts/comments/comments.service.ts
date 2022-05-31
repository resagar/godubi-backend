import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = this.commentsRepository.create(createCommentDto);
    await this.commentsRepository.save(newComment);
    return newComment;
  }

  async findAll() {
    return await this.commentsRepository.find();
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentsRepository.update(id, updateCommentDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
