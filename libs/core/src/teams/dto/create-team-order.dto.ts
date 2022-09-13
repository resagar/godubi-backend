import { Order } from '@core/orders/entities/order.entity';
import { Team } from '@core/teams/entities/team.entity';

export class CreateTeamOrderDto {
  teamOrder: TeamOrder[];
}

export class TeamOrder {
  public order: Order;
  public team: Team;
}
