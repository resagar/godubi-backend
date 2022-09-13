import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePostEvent } from './events/create-post.event';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
    this.eventEmitter.emit(
      'post.created',
      new CreatePostEvent(createPostDto['id'], createPostDto['user']),
    );
    return newPost;
  }

  async findAll() {
    const posts = await this.postsRepository.find({
      order: {
        createdAt: 'DESC',
        comments: {
          createdAt: 'ASC',
        },
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
        order: true,
      },
    });
    posts.map((post) => {
      post?.user?.transformAvatarBufferToString();
      post?.comments.map((comment) =>
        comment?.user?.transformAvatarBufferToString(),
      );
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      order: {
        comments: {
          createdAt: 'ASC',
        },
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
        order: true,
      },
      where: {
        id,
      },
    });
    post?.user?.transformAvatarBufferToString();
    post?.comments.map((comment) =>
      comment?.user?.transformAvatarBufferToString(),
    );
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }

  async getUserFromNotification(id: number) {
    return await this.postsRepository.findOne({
      relations: {
        user: true,
        order: {
          user: true,
          workerOrders: {
            worker: {
              user: true,
            },
          },
        },
      },
      where: {
        id,
      },
    });
  }
}
