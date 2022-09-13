import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoginModule } from './login/login.module';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PostsModule } from './posts/posts.module';
import { ServicesModule } from './services/services.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { WorkersModule as WorkersModuleHTTP } from './workers/workers.module';
import { MeetsModule } from './meets/meets.module';
import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    LoginModule,
    UsersModule,
    OrdersModule,
    PostsModule,
    ServicesModule,
    PortfolioModule,
    WorkersModuleHTTP,
    MeetsModule,
    GuestsModule,
  ],
})
export class WorkerModule {}
