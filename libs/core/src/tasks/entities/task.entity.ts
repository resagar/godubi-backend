import { Board } from '@core/boards/entities/board.entity';
import { User } from '@core/users/entities/user.entity';
import { Worker } from '@core/workers/entities/worker.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column({ name: 'board_id' })
  boardId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'worker_id' })
  workerId: number;

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column()
  tag: string;

  @Column({ nullable: true })
  highlight: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @BeforeInsert()
  private setCreateDate(): void {
    this.status = 'pending';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}
