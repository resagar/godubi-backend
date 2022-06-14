import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'orders_workers',
})
export class WorkerOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'orders_id' })
  orderId: number;

  @Column({ name: 'workers_id' })
  workerId: number;

  @Column({ name: 'type_action' })
  typeAction: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}