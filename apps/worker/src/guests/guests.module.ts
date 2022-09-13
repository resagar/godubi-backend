import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsModule as GuestsCoreModule } from '@core/guests/guests.module';

@Module({
  imports: [GuestsCoreModule],
  controllers: [GuestsController],
})
export class GuestsModule {}
