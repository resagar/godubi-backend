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
  inputId: number;

  @Column({ name: 'orders_id' })
  orderId: number;

  @Column()
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
