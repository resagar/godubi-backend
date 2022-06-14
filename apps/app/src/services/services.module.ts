import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesModule as ServicesModuleCore } from '@core/services/services.module';

@Module({
  controllers: [ServicesController],
  imports: [ServicesModuleCore],
})
export class ServicesModule {}
