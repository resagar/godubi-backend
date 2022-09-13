import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async findAll() {
    const tasks = await this.taskRepository.find({
      relations: {
        worker: {
          user: true,
        },
        user: true,
        board: true,
      },
    });
    tasks.map((task) => {
      task?.user?.transformAvatarBufferToString();
      task?.worker?.user?.transformAvatarBufferToString();
    });

    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      relations: {
        worker: {
          user: true,
        },
        user: true,
        board: true,
      },
      where: {
        id,
      },
    });
    task?.user?.transformAvatarBufferToString();
    task?.worker?.user?.transformAvatarBufferToString();

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.taskRepository.delete(id);
  }
}
