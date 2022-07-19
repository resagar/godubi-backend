import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@core/users/entities/user.entity';
import { Order } from '@core/orders/entities/order.entity';

@Entity({
  name: 'notifications',
})
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  read: number;

  @Column()
  text: string;

  @Column()
  icon: string;

  @Column()
  action: string;

  @Column()
  admin: number;

  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orders_id' })
  order: Order;

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
