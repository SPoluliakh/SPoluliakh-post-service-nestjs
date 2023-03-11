import { Test, TestingModule } from '@nestjs/testing';
import { TtnsService } from './ttns.service';

describe('TtnsService', () => {
  let service: TtnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TtnsService],
    }).compile();

    service = module.get<TtnsService>(TtnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
