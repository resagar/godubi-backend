import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamOrder } from './entities/team-order.entity';
import { TeamUser } from './entities/team-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamOrder, TeamUser])],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
