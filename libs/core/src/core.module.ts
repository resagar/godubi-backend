import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
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
import { NotificationsModule } from './notifications/notifications.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { MeetsModule } from './meets/meets.module';
import { GuestsModule } from './guests/guests.module';
import { TeamsModule } from './teams/teams.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CategoriesModule,
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
    NotificationsModule,
    PortfolioModule,
    MeetsModule,
    GuestsModule,
    TeamsModule,
    BoardsModule,
    TasksModule,
  ],
})
export class CoreModule {}
