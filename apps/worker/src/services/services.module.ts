import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesModule as ServicesModuleCore } from '@core/services/services.module';
import { UsersModule as UsersModuleCore } from '@core/users/users.module';

@Module({
  controllers: [ServicesController],
  imports: [ServicesModuleCore, UsersModuleCore],
})
export class ServicesModule {}
