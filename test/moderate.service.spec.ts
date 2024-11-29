import { Test, TestingModule } from '@nestjs/testing';
import { ModerateService } from '../src/moderate/moderate.service';

describe('ModerateService', () => {
  let service: ModerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModerateService],
    }).compile();

    service = module.get<ModerateService>(ModerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
