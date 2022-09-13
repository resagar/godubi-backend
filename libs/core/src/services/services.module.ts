import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesService as ServicesServiceAdmin } from './admin/services.service';
import { ServicesService as ServicesServiceWorker } from './worker/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceWorker } from './entities/service-worker.entity';
import { ServiceHashtagEntity } from './entities/service-hashtag.entity';
import { ServiceItemEntity } from './entities/service-item.entity';
import { ServiceResultEntity } from './entities/service-result.entity';
import { Hashtag } from '@core/hashtags/entities/hashtag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      ServiceWorker,
      ServiceHashtagEntity,
      ServiceItemEntity,
      ServiceResultEntity,
      Hashtag,
    ]),
  ],
  providers: [ServicesService, ServicesServiceAdmin, ServicesServiceWorker],
  exports: [ServicesService, ServicesServiceAdmin, ServicesServiceWorker],
})
export class ServicesModule {}
