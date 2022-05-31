import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async findAll() {
    return await this.postsRepository.find({
      relations: {
        comments: {
          user: true,
        },
        order: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({
      relations: {
        comments: {
          user: true,
        },
        order: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
