import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersService as UsersServiceAdmin } from './admin/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersServiceAdmin],
  exports: [UsersService, UsersServiceAdmin, UsersModule],
})
export class UsersModule {}
