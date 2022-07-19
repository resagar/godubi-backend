import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
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
