import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsModule as OptionsModuleCore } from '@core';

@Module({
  imports: [OptionsModuleCore],
  controllers: [OptionsController],
})
export class OptionsModule {}
