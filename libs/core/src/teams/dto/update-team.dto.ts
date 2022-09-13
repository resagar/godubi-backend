import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { TeamUser } from './create-team-user.dto';
import { TeamOrder } from './create-team-order.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  public teamUser?: TeamUser;
  public teamOrder?: TeamOrder;
}
