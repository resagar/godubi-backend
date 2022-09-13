import { Test, TestingModule } from '@nestjs/testing';
import { MeetsController } from './meets.controller';
import { MeetsService } from '@core/meets/meets.service';

describe('MeetsController', () => {
  let controller: MeetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetsController],
      providers: [MeetsService],
    }).compile();

    controller = module.get<MeetsController>(MeetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
