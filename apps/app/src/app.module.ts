import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { CoreModule } from '@core/core.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { InputsModule } from './inputs/inputs.module';
import { OptionsModule } from './options/options.module';
import { ItemsModule } from './items/items.module';
import { ResultsModule } from './results/results.module';
import { WorkersModule } from './workers/workers.module';
import { PostsModule } from './posts/posts.module';
import { LoginModule } from './login/login.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SearchModule } from '../../admin/src/search/search.module';

@Module({
  imports: [
    CategoriesModule,
    CoreModule,
    HashtagsModule,
    ServicesModule,
    OrdersModule,
    UsersModule,
    InputsModule,
    OptionsModule,
    ItemsModule,
    ResultsModule,
    WorkersModule,
    PostsModule,
    LoginModule,
    NotificationsModule,
    SearchModule,
  ],
})
export class AppModule {}
