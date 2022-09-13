import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meet } from '@core/meets/entities/meet.entity';
import { User } from '@core/users/entities/user.entity';

@Entity({
  name: 'guests',
})
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meet, (meet) => meet.guests)
  @JoinColumn({ name: 'meet_id' })
  meet: Meet;

  @ManyToOne(() => User, (user) => user.guests)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  accepted: number;

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
