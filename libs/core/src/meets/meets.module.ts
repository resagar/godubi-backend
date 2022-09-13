import { Module } from '@nestjs/common';
import { MeetsService } from './meets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meet } from '@core/meets/entities/meet.entity';
import { MeetsService as MeetsAdminService } from './admin/meets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meet])],
  exports: [MeetsService, MeetsAdminService],
  providers: [MeetsService, MeetsAdminService],
})
export class MeetsModule {}
