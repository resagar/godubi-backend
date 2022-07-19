import { Input } from '@core/inputs/entities/input.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
