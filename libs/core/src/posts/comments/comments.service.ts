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
    const comments = await this.commentsRepository.find({
      relations: {
        user: true,
      },
    });
    comments.map((comment) => {
      comment?.user.transformAvatarBufferToString();
    });
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({
      relations: {
        user: true,
      },
      where: { id },
    });
    comment?.user.transformAvatarBufferToString();
    return comment;
  }

  async getUserFromNotification(postId: number) {
    return await this.commentsRepository.find({
      relations: {
        post: {
          user: {
            id: true,
          },
          order: {
            id: true,
          },
        },
        user: {
          id: true,
        },
      },
      where: {
        post: {
          id: postId,
        },
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentsRepository.delete(id);
  }
}
