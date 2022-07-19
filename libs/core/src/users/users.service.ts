import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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

  async findAll(userId: number) {
    const user: User[] = await this.usersRepository.find({
      relations: {
        worker: {
          services: true,
        },
      },
      where: {
        id: userId,
      },
    });
    user.map((user) => user.transformAvatarBufferToString());
    return user;
  }

  // async findOne(id: number) {
  //   return await this.usersRepository.findOne({
  //     relations: {
  //       worker: true,
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  // }

  async findByEmail(email: string) {
    const user: User = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    user.transformAvatarBufferToString();
    return user;
  }

  async findByUsername(username: string) {
    const user: User = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    user.transformAvatarBufferToString();
    return user;
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

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
