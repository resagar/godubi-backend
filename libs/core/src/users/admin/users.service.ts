import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
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

  async findAll(
    limit: number,
    skip: number,
    username: string,
    email: string,
    country: string,
    state: string,
    city: string,
    created: Date,
  ) {
    const where: FindOptionsWhere<User> = {};
    username ? (where.username = username) : null;
    email ? (where.email = email) : null;
    country ? (where.country = country) : null;
    state ? (where.state = state) : null;
    city ? (where.city = city) : null;
    created ? (where.createdAt = created) : null;

    const user: User[] = await this.usersRepository.find({
      relations: {
        worker: {
          services: true,
        },
      },
      where,
      take: limit,
      skip,
    });
    user.map((user) => {
      user.transformAvatarBufferToString();
    });
    return user;
  }

  async findOne(id: number) {
    const user: User = await this.usersRepository.findOne({
      relations: {
        worker: true,
        orders: {
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
    user.transformAvatarBufferToString();
    return user;
  }

  // async findByEmail(email: string) {
  // const user: User = await this.usersRepository.findOne({
  // where: {
  // email: email,
  // },
  // });
  // if (user.avatar) {
  // const buff = Buffer.from(user.avatar);
  // user.avatar = buff.toString();
  // }
  // return user;
  // }

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
