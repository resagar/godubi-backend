import { Injectable } from '@nestjs/common';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { UpdateMeetDto } from '../dto/update-meet.dto';
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

  async findAll() {
    const meets = await this.meetsRepository.find({
      relations: {
        user: true,
        order: true,
        guests: {
          user: true,
        },
      },
    });

    meets.map((meet) => {
      meet.user?.transformAvatarBufferToString();
      meet.guests?.map((guest) => guest.user?.transformAvatarBufferToString());
    });

    return meets;
  }

  async findOne(id: number) {
    const meet = await this.meetsRepository.findOne({
      relations: {
        user: true,
        order: true,
        guests: {
          user: true,
        },
      },
      where: { id },
    });
    meet.user?.transformAvatarBufferToString();
    meet.guests?.map((guest) => guest.user?.transformAvatarBufferToString());
    return meet;
  }

  async update(id: number, updateMeetDto: UpdateMeetDto) {
    return await this.meetsRepository.update(id, updateMeetDto);
  }

  async remove(id: number) {
    return await this.meetsRepository.delete(id);
  }
}
