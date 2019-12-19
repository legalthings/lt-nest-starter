import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { HealthModuleConfig } from './health.module';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(HealthModuleConfig).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
