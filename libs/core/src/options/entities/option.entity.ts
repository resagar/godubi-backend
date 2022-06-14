import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Input } from '@core/inputs/entities/input.entity';

@Entity({
  name: 'options',
})
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToMany(() => Input, (input) => input.options)
  @JoinTable({
    name: 'inputs_options',
    joinColumn: {
      name: 'options_id',
    },
    inverseJoinColumn: {
      name: 'inputs_id',
    },
  })
  inputs: Input[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
