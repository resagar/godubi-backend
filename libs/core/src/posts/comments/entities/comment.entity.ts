import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '@core/posts/entities/post.entity';
import { User } from '@core/users/entities/user.entity';

@Entity({
  name: 'PostComments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  // @Column({ name: 'post_id' })
  // postId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  // @Column({ name: 'user_id' })
  // userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
