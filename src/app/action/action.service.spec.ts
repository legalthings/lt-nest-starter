import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';
import { actionModuleConfig } from './action.module';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(actionModuleConfig).compile();

    service = module.get<ActionService>(ActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
