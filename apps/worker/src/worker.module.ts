import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PostsModule } from './posts/posts.module';
import { ServicesModule } from './services/services.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { WorkersModule as WorkersModuleHTTP } from './workers/workers.module';

@Module({
  imports: [
    CoreModule,
    LoginModule,
    UsersModule,
    OrdersModule,
    PostsModule,
    ServicesModule,
    PortfolioModule,
    WorkersModuleHTTP,
  ],
})
export class WorkerModule {}
