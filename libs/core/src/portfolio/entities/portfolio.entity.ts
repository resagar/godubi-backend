import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '@core/services/entities/service.entity';

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

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'services_id' })
  service: Service;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
