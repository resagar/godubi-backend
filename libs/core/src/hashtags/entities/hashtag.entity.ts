import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '@core/categories/entities/category.entity';
import { Service } from '@core/services/entities/service.entity';

@Entity({
  name: 'hashtags',
})
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Category, (category) => category.hashtags)
  @JoinTable({
    name: 'categories_hashtags',
    joinColumn: {
      name: 'hashtags_id',
    },
    inverseJoinColumn: {
      name: 'categories_id',
    },
  })
  categories: Category[];

  @ManyToMany(() => Service, (service) => service.hashtags, {
    cascade: true,
  })
  @JoinTable({
    name: 'hashtags_services',
    joinColumn: {
      name: 'hashtags_id',
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
