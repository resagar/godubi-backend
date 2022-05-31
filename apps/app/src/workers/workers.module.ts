import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersModule as WorkersModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [WorkersModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [WorkersController],
})
export class WorkersModule {}
