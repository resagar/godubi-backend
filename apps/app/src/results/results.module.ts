import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsModule as ResultsModuleCore } from '@core';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';

@Module({
  imports: [ResultsModuleCore],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [ResultsController],
})
export class ResultsModule {}
