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
import { Hashtag } from '@core/hashtags/entities/hashtag.entity';
import { Service } from '@core/services/entities/service.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public slug: string;

  @Column()
  public icon: string;

  @Column({ name: 'card_bg' })
  public cardBg: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ name: 'short_desc', nullable: true })
  public shortDesc: string;

  @Column({ name: 'parent_id', width: 20, nullable: true })
  public idParent: number;

  @Column({ width: 4, nullable: true })
  public active: number;

  @Column({ width: 11 })
  public priority: number;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'categories_hashtags',
    joinColumn: {
      name: 'categories_id',
    },
    inverseJoinColumn: {
      name: 'hashtags_id',
    },
  })
  hashtags: Hashtag[];

  @OneToMany(() => Service, (service) => service.category, {
    onDelete: 'CASCADE',
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
