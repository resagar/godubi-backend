import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hashtag } from '@core/hashtags/entities/hashtag.entity';
import { Item } from '@core/items/entities/item.entity';
import { Input } from '@core/inputs/entities/input.entity';
import { Worker } from '@core/workers/entities/worker.entity';
import { Result } from '@core/results/entities/result.entity';
import { Category } from '@core/categories/entities/category.entity';
import { Order } from '@core/orders/entities/order.entity';

@Entity({
  name: 'services',
})
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'short_desc' })
  shortDesc: string;

  @Column()
  description: string;

  // @Column({ name: 'categories_id' })
  // categoryId: number;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: 'categories_id' })
  category: any;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  priority: number;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.services)
  @JoinTable({
    name: 'hashtags_services',
    joinColumn: {
      name: 'services_id',
    },
    inverseJoinColumn: {
      name: 'hashtags_id',
    },
  })
  hashtags: Hashtag[];

  @ManyToMany(() => Item, (item) => item.services)
  @JoinTable({
    name: 'items_services',
    joinColumn: {
      name: 'services_id',
    },
    inverseJoinColumn: {
      name: 'items_id',
    },
  })
  items: Item[];

  @ManyToMany(() => Input, (input) => input.services)
  @JoinTable({
    name: 'inputs_services',
    joinColumn: {
      name: 'services_id',
    },
    inverseJoinColumn: {
      name: 'inputs_id',
    },
  })
  inputs: Input[];

  @ManyToMany(() => Worker, (worker) => worker.services)
  @JoinTable({
    name: 'services_workers',
    joinColumn: {
      name: 'services_id',
    },
    inverseJoinColumn: {
      name: 'workers_id',
    },
  })
  workers: Worker[];

  @ManyToMany(() => Result, (result) => result.services)
  @JoinTable({
    name: 'results_services',
    joinColumn: {
      name: 'services_id',
    },
    inverseJoinColumn: {
      name: 'results_id',
    },
  })
  results: Result[];

  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
