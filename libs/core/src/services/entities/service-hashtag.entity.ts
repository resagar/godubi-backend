import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'hashtags_services' })
export class ServiceHashtagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'services_id' })
  service: number;

  @Column({ name: 'hashtags_id' })
  hashtag: number;

  @Column({ nullable: true })
  priority: number;

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
