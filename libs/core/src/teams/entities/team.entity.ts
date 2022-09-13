import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamUser } from '@core/teams/entities/team-user.entity';
import { TeamOrder } from '@core/teams/entities/team-order.entity';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'invited_link' })
  invitedLink: string;

  @Column({ name: 'business_name' })
  businessName: string;

  @Column()
  logo: string;

  @Column({ nullable: true })
  description: string;

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

  @OneToMany(() => TeamUser, (teamUser) => teamUser.team)
  teamUsers: TeamUser[];

  @OneToMany(() => TeamOrder, (teamOrder) => teamOrder.team)
  teamOrders: TeamOrder[];

  public transformLogoBufferToString() {
    if (this.logo) {
      const buff = Buffer.from(this.logo);
      this.logo = buff.toString();
    }
  }
}
