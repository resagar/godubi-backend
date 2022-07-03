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
import { Post } from '@core/posts/entities/post.entity';
import { Service } from '@core/services/entities/service.entity';
import { User } from '@core/users/entities/user.entity';
import { InputOrder } from './input-order.entity';
import { WorkerOrder } from './worker-order.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chat_id', nullable: true })
  chatId: number;

  @Column({ name: 'order_status', nullable: true })
  orderStatus: string;

  @Column({ name: 'order_budget', nullable: true })
  orderBudget: number;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod: string;

  @Column({ name: 'payment_id', nullable: true })
  paymentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ name: 'short_desc', nullable: true })
  shortDesc: string;

  @Column({ name: 'order_time', nullable: true })
  orderTime: Date;

  @Column({ name: 'order_description', nullable: true })
  orderDescription: string;

  @Column({ nullable: true })
  website: string;

  @Column({ name: 'order_cost', nullable: true })
  orderCost: number;

  @OneToMany(() => Post, (post) => post.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  post: Post;

  @OneToMany(() => InputOrder, (inputOrder) => inputOrder.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  inputOrders: InputOrder[];

  @OneToMany(() => WorkerOrder, (workerOrder) => workerOrder.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  workerOrders: WorkerOrder[];

  @ManyToOne(() => Service, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'services_id' })
  service: Service;

  @ManyToOne(() => User, (user) => user.orders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
