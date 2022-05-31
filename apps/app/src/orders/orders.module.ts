import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersModule as OrdersModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [OrdersModuleCore],
})
export class OrdersModule {}
