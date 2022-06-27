import { Post } from '@core/posts/entities/post.entity';
import { Input } from '@core/inputs/entities/input.entity';
import { Worker } from '@core/workers/entities/worker.entity';
import { Service } from '@core/services/entities/service.entity';
import { User } from '@core/users/entities/user.entity';

export class CreateOrderDto {
  chatId?: number;
  orderStatus?: string;
  orderBudget?: number;
  paymentMethod?: string;
  paymentId?: number;
  title?: string;
  shortDesc?: string;
  orderTime?: Date;
  orderDescription?: string;
  website?: string;
  orderCost?: number;
  post: Post;
  inputs: Input[];
  workers: Worker[];
  service: Service;
  user: User;
}
