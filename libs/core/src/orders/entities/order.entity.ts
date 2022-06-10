import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '@core/posts';
import { Input } from '@core/inputs';
import { Worker } from '@core/workers';
import { Service } from '@core/services';
import { User } from '@core/users';

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

  // @Column({ name: 'user_id', nullable: true })
  // userId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ name: 'short_desc', nullable: true })
  shortDesc: string;

  @Column({ name: 'order_time', nullable: true })
  orderTime: Date;

  @Column({ name: 'order_description', nullable: true })
  orderDescription: string;

  // @Column({ name: 'services_id' })
  // servicesId: number;

  @Column({ nullable: true })
  website: string;

  @Column({ name: 'order_cost', nullable: true })
  orderCost: number;

  @OneToMany(() => Post, (post) => post.order)
  post: Post;

  @ManyToMany(() => Input)
  @JoinTable({
    name: 'inputs_orders',
    joinColumn: {
      name: 'orders_id',
    },
    inverseJoinColumn: {
      name: 'inputs_id',
    },
  })
  inputs: Input[];

  @ManyToMany(() => Worker)
  @JoinTable({
    name: 'orders_workers',
    joinColumn: {
      name: 'orders_id',
    },
    inverseJoinColumn: {
      name: 'workers_id',
    },
  })
  workers: Worker[];

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'services_id' })
  service: Service;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
