import { Test, TestingModule } from '@nestjs/testing';
import { VisibilityController } from './visibility.controller';

describe('VisibilityController', () => {
  let controller: VisibilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisibilityController],
    }).compile();

    controller = module.get<VisibilityController>(VisibilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
