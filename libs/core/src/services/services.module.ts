import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceWorker } from './entities/service-worker.entity';
import { ServiceHashtagEntity } from './entities/service-hashtag.entity';
import { ServiceItemEntity } from './entities/service-item.entity';
import { ServiceResultEntity } from './entities/service-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      ServiceWorker,
      ServiceHashtagEntity,
      ServiceItemEntity,
      ServiceResultEntity,
    ]),
  ],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
