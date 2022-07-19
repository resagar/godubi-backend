import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from '@core/options/entities/option.entity';
import { Service } from '@core/services/entities/service.entity';
import { InputOrder } from '@core/orders/entities/input-order.entity';

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

  @ManyToMany(() => Option, (option) => option.inputs, {
    onDelete: 'CASCADE',
  })
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

  @ManyToMany(() => Service, (service) => service.inputs, {
    onDelete: 'CASCADE',
  })
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

  @OneToMany(() => InputOrder, (inputOrder) => inputOrder.input, {
    onDelete: 'CASCADE',
  })
  inputOrders: InputOrder[];

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
