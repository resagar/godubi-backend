import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from '../comments/entities';
import { Order } from '@core/orders/entities/order.entity';
import { User } from '@core/users/entities/user.entity';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  type: string;

  // @Column({ name: 'order_id' })
  // orderId: number;

  @ManyToOne(() => Order, (order) => order.post)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // @Column({ name: 'user_id' })
  // userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
