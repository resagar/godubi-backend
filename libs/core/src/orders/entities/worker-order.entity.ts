import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Worker } from '@core/workers/entities/worker.entity';

@Entity({
  name: 'orders_workers',
})
export class WorkerOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.workerOrders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orders_id' })
  order: Order;

  @ManyToOne(() => Worker, (worker) => worker.workerOrders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workers_id' })
  worker: Worker;

  @Column({ name: 'type_action' })
  typeAction: string;

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
