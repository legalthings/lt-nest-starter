import { Test, TestingModule } from '@nestjs/testing';
import { HasherService } from './hasher.service';
import { HasherModuleConfig } from './hasher.module';

describe('HasherService', () => {
  let service: HasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(HasherModuleConfig).compile();

    service = module.get<HasherService>(HasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
