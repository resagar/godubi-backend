import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsModule as TeamsCoreModule } from '@core/teams/teams.module';

@Module({
  imports: [TeamsCoreModule],
  controllers: [TeamsController],
})
export class TeamsModule {}
