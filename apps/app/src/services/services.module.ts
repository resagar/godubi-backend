import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesModule as ServicesModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  controllers: [ServicesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [ServicesModuleCore],
})
export class ServicesModule {}
