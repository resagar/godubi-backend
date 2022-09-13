import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '@core/teams/entities/team.entity';
import { TeamUser } from '@core/teams/entities/team-user.entity';
import { TeamOrder } from '@core/teams/entities/team-order.entity';
import { CreateTeamUserDto } from '@core/teams/dto/create-team-user.dto';
import { CreateTeamOrderDto } from '@core/teams/dto/create-team-order.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamUser)
    private teamUserRepository: Repository<TeamUser>,
    @InjectRepository(TeamOrder)
    private teamOrderRepository: Repository<TeamOrder>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const newTeam = this.teamRepository.create(createTeamDto);
    await this.teamRepository.save(newTeam);
    return newTeam;
  }

  async createTeamUser(createTeamUserDto: CreateTeamUserDto) {
    const newTeamUser = this.teamUserRepository.create(
      createTeamUserDto.teamUser,
    );
    await this.teamUserRepository.save(newTeamUser);
    return newTeamUser;
  }

  async createTeamOrder(createTeamOrderDto: CreateTeamOrderDto) {
    const newTeamOrder = this.teamOrderRepository.create(
      createTeamOrderDto.teamOrder,
    );
    await this.teamOrderRepository.save(newTeamOrder);
    return newTeamOrder;
  }

  async findAll(limit = 10, skip = 0) {
    const teams: Team[] = await this.teamRepository.find({
      relations: {
        teamOrders: {
          order: true,
        },
        teamUsers: {
          user: true,
        },
      },
      take: limit,
      skip,
    });
    teams.map((team) => {
      team?.transformLogoBufferToString();
      team?.teamUsers.map((teamUser) => {
        teamUser?.user.transformAvatarBufferToString();
      });
    });
    return teams;
  }

  async findOne(id: number) {
    const team: Team = await this.teamRepository.findOne({
      relations: {
        teamOrders: {
          order: true,
        },
        teamUsers: {
          user: true,
        },
      },
      where: {
        id,
      },
    });
    team?.transformLogoBufferToString();
    team?.teamUsers.map((teamUser) =>
      teamUser?.user?.transformAvatarBufferToString(),
    );
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return await this.teamRepository.update(id, updateTeamDto);
  }

  async updateUser(
    teamId: number,
    userId: number,
    updateTeamDto: UpdateTeamDto,
  ) {
    return await this.teamUserRepository.update(
      {
        team: {
          id: teamId,
        },
        user: {
          id: userId,
        },
      },
      updateTeamDto.teamUser,
    );
  }

  async updateOrder(
    teamId: number,
    orderId: number,
    updateTeamDto: UpdateTeamDto,
  ) {
    return await this.teamOrderRepository.update(
      {
        team: {
          id: teamId,
        },
        order: {
          id: orderId,
        },
      },
      updateTeamDto.teamOrder,
    );
  }

  async remove(id: number) {
    return await this.teamRepository.delete(id);
  }

  async removeUser(teamId: number, userId: number) {
    return await this.teamUserRepository.delete({
      team: {
        id: teamId,
      },
      user: {
        id: userId,
      },
    });
  }

  async removeOrder(teamId: number, orderId: number) {
    return await this.teamOrderRepository.delete({
      team: {
        id: teamId,
      },
      order: {
        id: orderId,
      },
    });
  }
}
