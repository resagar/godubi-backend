import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@core/users/entities/user.entity';
import { Service } from '@core/services/entities/service.entity';

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

  // @Column({ name: 'users_id' })
  // userId: number;

  @OneToOne(() => User, (user) => user.worker)
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToMany(() => Service, (service) => service.workers)
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
