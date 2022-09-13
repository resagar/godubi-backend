import { Service } from '@core/services/entities/service.entity';

export class CreateServiceResponseDto extends Service {
  public related?: Service[];
}
