import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as UsersModuleCore } from '@core/users/users.module';

@Module({
  imports: [UsersModuleCore],
  controllers: [UsersController],
})
export class UsersModule {}
