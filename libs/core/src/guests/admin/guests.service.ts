import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { UpdateGuestDto } from '../dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from '@core/guests/entities/guest.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async create(createGuestDto: CreateGuestDto) {
    const newGuest = this.guestsRepository.create(createGuestDto);
    await this.guestsRepository.save(newGuest);
    return newGuest;
  }

  async findAll() {
    const meets = await this.guestsRepository.find({
      relations: {
        user: true,
        meet: {
          user: true,
        },
      },
    });

    meets.map((meet) => {
      meet.user?.transformAvatarBufferToString();
      meet.meet.user?.transformAvatarBufferToString();
    });

    return meets;
  }

  async findOne(id: number) {
    const meet = await this.guestsRepository.findOne({
      relations: {
        user: true,
        meet: {
          user: true,
        },
      },
      where: { id },
    });
    meet.user?.transformAvatarBufferToString();
    meet.meet.user?.transformAvatarBufferToString();
    return meet;
  }

  async update(id: number, updateMeetDto: UpdateGuestDto) {
    return await this.guestsRepository.update(id, updateMeetDto);
  }

  async remove(id: number) {
    return await this.guestsRepository.delete(id);
  }
}
