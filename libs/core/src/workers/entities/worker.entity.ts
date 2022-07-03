import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@core/users/entities/user.entity';
import { Service } from '@core/services/entities/service.entity';
import { WorkerOrder } from '@core/orders/entities/worker-order.entity';
import { Portfolio } from '@core/portfolio/entities/portfolio.entity';

@Entity({
  name: 'workers',
})
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  balance: number;

  @Column({ name: 'godubi_title', nullable: true })
  godubiTitle: string;

  @Column({ nullable: true })
  range: string;

  @OneToOne(() => User, (user) => user.worker, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToMany(() => Service, (service) => service.workers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'services_workers',
    joinColumn: {
      name: 'workers_id',
    },
    inverseJoinColumn: {
      name: 'services_id',
    },
  })
  services: Service[];

  @OneToMany(() => WorkerOrder, (workerOrder) => workerOrder.worker, {
    onDelete: 'CASCADE',
  })
  workerOrders: WorkerOrder[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.worker)
  portfolios: Portfolio;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
