import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '@core/services/entities/service.entity';

@Entity({
  name: 'results',
})
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @ManyToMany(() => Service, (service) => service.results, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'results_services',
    joinColumn: {
      name: 'results_id',
    },
    inverseJoinColumn: {
      name: 'services_id',
    },
  })
  services: Service[];
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
