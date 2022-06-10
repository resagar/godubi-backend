import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { HashtagsModule } from './hashtags';
import { ServicesModule } from './services';
import { OrdersModule } from './orders';
import { UsersModule } from './users';
import { InputsModule } from './inputs';
import { OptionsModule } from './options';
import { ItemsModule } from './items';
import { ResultsModule } from './results';
import { WorkersModule } from './workers';
import { PostsModule } from './posts';
import { NotificationsModule } from './notifications/notifications.module';

import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('app.database.host'),
        port: configService.get<number>('app.database.port'),
        username: configService.get<string>('app.database.username'),
        password: configService.get<string>('app.database.password'),
        database: configService.get<string>('app.database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('core.database.synchronize'),
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
  ],
})
export class CoreModule {}
