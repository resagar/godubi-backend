import { Order } from '@core/orders/entities/order.entity';
import { User } from '@core/users/entities/user.entity';

export class CreateTeamUserDto {
  teamUser: TeamUser[];
}

export class TeamUser {
  public order: Order;
  public user: User;
}
