import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Worker } from '@core/workers/entities/worker.entity';
import { Order } from '@core/orders/entities/order.entity';
import { Meet } from '@core/meets/entities/meet.entity';
import { Guest } from '@core/guests/entities/guest.entity';
import { TeamUser } from '@core/teams/entities/team-user.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  username: string;

  @Column()
  email: string;

  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken: string;

  @Column({ nullable: true })
  agent: number;

  @Column({ nullable: true, name: 'complete_name' })
  completeName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  fondos: number;

  @Column({ nullable: true, default: 0 })
  admin: number;

  @Column({ name: 'worker', nullable: true, default: 0 })
  isWorker: number;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  languages: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => Worker, (worker) => worker.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  worker: Worker;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @OneToMany(() => Meet, (meet) => meet.user)
  meets: Meet[];

  @OneToMany(() => Guest, (guest) => guest.user)
  guests: Guest[];

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUsers: TeamUser[];

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

  public transformAvatarBufferToString() {
    if (this.avatar) {
      const buff = Buffer.from(this.avatar);
      this.avatar = buff.toString();
    }
  }
}
