import { Module } from '@nestjs/common';
import { InputsModule as InputsModuleCore } from '@core/inputs/inputs.module';
import { InputsController } from './inputs.controller';

@Module({
  imports: [InputsModuleCore],
  controllers: [InputsController],
})
export class InputsModule {}
