import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'inputs_orders',
})
export class InputOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'inputs_id' })
  input: number;

  @Column({ name: 'orders_id' })
  order: number;

  @Column()
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
