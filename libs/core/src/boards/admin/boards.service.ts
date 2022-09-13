import { Task } from '@core/tasks/entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { GetFilterTasksDto } from '../dto/get-filter-tasks.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';

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

  async findAll(getFilterTasksDto: GetFilterTasksDto) {
    const { status, highlight, workerId, tag } = getFilterTasksDto;
    const where: FindOptionsWhere<Board> = {};
    status ? (where.tasks = { status }) : (where.tasks = { status: 'pending' });
    highlight ? (where.tasks = { highlight }) : null;
    workerId ? (where.tasks = { workerId }) : null;
    tag ? (where.tasks = { tag }) : null;
    return await this.boardRepository.find({
      relations: {
        tasks: true,
        order: true,
      },
      where,
    });
  }

  async findOne(id: number) {
    return await this.boardRepository.findOne({
      relations: {
        tasks: true,
        order: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.boardRepository.update(id, updateBoardDto);
  }

  async remove(id: number) {
    return await this.boardRepository.delete(id);
  }
}
