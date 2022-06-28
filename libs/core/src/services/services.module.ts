import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceWorker } from './entities/service-worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceWorker])],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
