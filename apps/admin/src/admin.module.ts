import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoreModule } from '@core/core.module';
import { LoginModule } from './login/login.module';
import { CategoriesModule } from './categories/categories.module';
import { ServicesModule } from './services/services.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { InputsModule } from './inputs/inputs.module';
import { OptionsModule } from './options/options.module';
import { ItemsModule } from './items/items.module';
import { WorkersModule } from './workers/workers.module';
import { OrdersModule } from './orders/orders.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    LoginModule,
    CategoriesModule,
    ServicesModule,
    HashtagsModule,
    InputsModule,
    OptionsModule,
    ItemsModule,
    WorkersModule,
    OrdersModule,
    SearchModule,
  ],
})
export class AdminModule {}
