import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsModule as OptionsModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [OptionsModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [OptionsController],
})
export class OptionsModule {}
