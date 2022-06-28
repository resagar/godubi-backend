import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'services_workers' })
export class ServiceWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'workers_id' })
  worker: number;

  @Column({ name: 'services_id' })
  service: number;

  @Column({ name: 'priority_type', default: 'normal' })
  priorityType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
