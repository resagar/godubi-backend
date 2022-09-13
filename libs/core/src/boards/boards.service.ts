import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newCreateBoard = this.boardRepository.create(createBoardDto);
    await this.boardRepository.save(newCreateBoard);
    return newCreateBoard;
  }

  async findAll(userId: number) {
    return await this.boardRepository.find({
      relations: {
        order: true,
      },
      where: {
        order: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return await this.boardRepository.findOne({
      relations: {
        order: true,
      },
      where: {
        id,
        order: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  async update(id: number, userId: number, description: string) {
    return await this.boardRepository.update(
      {
        id,
        order: {
          user: {
            id: userId,
          },
        },
      },
      { description },
    );
  }

  // async remove(id: number) {
  //   return await this.boardRepository.delete(id);
  // }
}
