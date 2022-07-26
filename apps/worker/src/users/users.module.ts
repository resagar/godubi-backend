import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as UsersModuleCore } from '@core/users/users.module';
import { AuthModule } from '@core/auth/auth.module';

@Module({
  imports: [UsersModuleCore, AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}
