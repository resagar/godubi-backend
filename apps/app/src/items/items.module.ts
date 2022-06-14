import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsModule as ItemsModuleCore } from '@core/items/items.module';

@Module({
  imports: [ItemsModuleCore],
  controllers: [ItemsController],
})
export class ItemsModule {}
