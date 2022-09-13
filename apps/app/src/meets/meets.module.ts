import { Module } from '@nestjs/common';
import { MeetsController } from './meets.controller';
import { MeetsModule as MeetsModuleCore } from '@core/meets/meets.module';

@Module({
  controllers: [MeetsController],
  imports: [MeetsModuleCore],
})
export class MeetsModule {}
