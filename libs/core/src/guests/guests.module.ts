import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from '@core/guests/entities/guest.entity';
import { GuestsService as GuestsAdminService } from './admin/guests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  providers: [GuestsService, GuestsAdminService],
  exports: [GuestsService, GuestsAdminService],
})
export class GuestsModule {}
