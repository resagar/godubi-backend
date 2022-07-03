import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    const salt = await genSalt(10);
    newUser.password = await hash(newUser.password, salt);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        worker: {
          services: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      relations: {
        worker: true,
      },
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async findAllBySearch(search: string) {
    return await this.usersRepository.find({
      where: {
        isWorker: 1,
        username: Like(search),
      },
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
