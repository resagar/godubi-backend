import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '@core/services/entities/service.entity';
import { Worker } from '@core/workers/entities/worker.entity';

@Entity({ name: 'portfolio' })
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  video: string;

  @ManyToOne(() => Service, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'services_id' })
  service: Service;

  @ManyToOne(() => Worker, (worker) => worker.portfolios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

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
