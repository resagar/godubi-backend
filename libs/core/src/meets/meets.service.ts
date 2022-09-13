import { Injectable } from '@nestjs/common';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from '@core/meets/entities/meet.entity';

@Injectable()
export class MeetsService {
  constructor(
    @InjectRepository(Meet)
    private meetsRepository: Repository<Meet>,
  ) {}

  async create(createMeetDto: CreateMeetDto) {
    const newMeet = this.meetsRepository.create(createMeetDto);
    await this.meetsRepository.save(newMeet);
    return newMeet;
  }

  async findAll(userId: number) {
    const meets = await this.meetsRepository.find({
      relations: {
        user: true,
        order: true,
        guests: {
          user: true,
        },
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    meets.map((meet) => {
      meet.user?.transformAvatarBufferToString();
      meet.guests?.map((guest) => guest.user?.transformAvatarBufferToString());
    });

    return meets;
  }

  async findOne(id: number, userId: number) {
    const meet = await this.meetsRepository.findOne({
      relations: {
        user: true,
        order: true,
        guests: {
          user: true,
        },
      },
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
    meet.user?.transformAvatarBufferToString();
    meet.guests?.map((guest) => guest.user?.transformAvatarBufferToString());
    return meet;
  }

  async update(id: number, userId: number, updateMeetDto: UpdateMeetDto) {
    return await this.meetsRepository.update(
      {
        id,
        user: {
          id: userId,
        },
      },
      updateMeetDto,
    );
  }

  async remove(id: number, userId: number) {
    return await this.meetsRepository.delete({
      id,
      user: {
        id: userId,
      },
    });
  }
}
