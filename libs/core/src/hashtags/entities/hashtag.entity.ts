import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
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

  @ManyToMany(() => Category, (category) => category.hashtags, {
    cascade: true,
    onDelete: 'CASCADE',
  })
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
    onDelete: 'CASCADE',
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
