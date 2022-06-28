import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Worker } from '@core/workers/entities/worker.entity';
import { Order } from '@core/orders/entities/order.entity';

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
  birthday: string;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => Worker, (worker) => worker.user, {
    cascade: true,
  })
  worker: Worker;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
