import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
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

  @ManyToMany(() => Input, (input) => input.options, {
    cascade: true,
    onDelete: 'CASCADE',
  })
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
