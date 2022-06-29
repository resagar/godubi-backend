import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UsersModule } from '@core/users/users.module';
import { AuthModule } from '@core/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [LoginController],
})
export class LoginModule {}
