import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Option } from '@core/options';
import { Service } from '@core/services';

@Entity({
  name: 'inputs',
})
export class Input {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @Column()
  description: string;

  @Column()
  placeholder: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Option, (option) => option.inputs)
  @JoinTable({
    name: 'inputs_options',
    joinColumn: {
      name: 'inputs_id',
    },
    inverseJoinColumn: {
      name: 'options_id',
    },
  })
  options: Option[];

  @ManyToMany(() => Service, (service) => service.inputs)
  @JoinTable({
    name: 'inputs_services',
    joinColumn: {
      name: 'inputs_id',
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
