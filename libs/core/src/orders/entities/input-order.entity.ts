import { Input } from '@core/inputs/entities/input.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({
  name: 'inputs_orders',
})
export class InputOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Input, (input) => input.inputOrders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inputs_id' })
  input: Input;

  @ManyToOne(() => Order, (order) => order.inputOrders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orders_id' })
  order: Order;

  @Column()
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
