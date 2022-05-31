import { Module } from '@nestjs/common';
import { InputsModule as InputsModuleCore } from '@core';
import { InputsController } from './inputs.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [InputsModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [InputsController],
})
export class InputsModule {}
