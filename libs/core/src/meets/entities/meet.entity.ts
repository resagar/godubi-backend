import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@core/users/entities/user.entity';
import { Order } from '@core/orders/entities/order.entity';
import { Guest } from '@core/guests/entities/guest.entity';

@Entity({
  name: 'meets',
})
export class Meet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date', nullable: true })
  endDate: Date;

  @Column()
  platform: string;

  @Column({ name: 'url_meet' })
  urlMeet: string;

  @ManyToOne(() => User, (user) => user.meets, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Order, (order) => order.meets, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToMany(() => Guest, (guest) => guest.meet)
  guests: Guest[];

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
