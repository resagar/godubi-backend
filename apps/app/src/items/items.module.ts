import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsModule as ItemsModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [ItemsModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
