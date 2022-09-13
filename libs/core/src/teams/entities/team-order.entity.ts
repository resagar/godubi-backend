import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '@core/orders/entities/order.entity';
import { Team } from '@core/teams/entities/team.entity';

@Entity({ name: 'teams_orders' })
export class TeamOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.teamOrders)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Team, (team) => team.teamUsers)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  private setCreateDate(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}
