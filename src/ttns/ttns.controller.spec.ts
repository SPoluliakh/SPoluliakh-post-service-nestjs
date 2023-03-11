import { Test, TestingModule } from '@nestjs/testing';
import { TtnsController } from './ttns.controller';

describe('TtnsController', () => {
  let controller: TtnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TtnsController],
    }).compile();

    controller = module.get<TtnsController>(TtnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
