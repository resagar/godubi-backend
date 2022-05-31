import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '@core/services';

@Entity({
  name: 'items',
})
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Service, (service) => service.items)
  @JoinTable({
    name: 'items_services',
    joinColumn: {
      name: 'items_id',
    },
    inverseJoinColumn: {
      name: 'services_id',
    },
  })
  services: Service[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}