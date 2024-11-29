import { Test, TestingModule } from '@nestjs/testing';
import { ModerateController } from '../src/moderate/moderate.controller';

describe('ModerateController', () => {
  let controller: ModerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModerateController],
    }).compile();

    controller = module.get<ModerateController>(ModerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
