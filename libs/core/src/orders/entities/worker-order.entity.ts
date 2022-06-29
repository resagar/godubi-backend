import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Worker } from '@core/workers/entities/worker.entity';

@Entity({
  name: 'orders_workers',
})
export class WorkerOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.workerOrders)
  @JoinColumn({ name: 'orders_id' })
  order: Order;

  @ManyToOne(() => Worker, (worker) => worker.workerOrders)
  @JoinColumn({ name: 'workers_id' })
  worker: Worker;

  @Column({ name: 'type_action' })
  typeAction: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
