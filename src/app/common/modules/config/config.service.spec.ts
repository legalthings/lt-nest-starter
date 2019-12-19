import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModuleConfig } from './config.module';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let module: TestingModule;
  let configService: ConfigService;

  beforeEach(async () => {
    module = await Test.createTestingModule(ConfigModuleConfig).compile();
    await module.init();

    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('get config', () => {
    test('getEnv()', async () => {
      expect(configService.getEnv()).toBe('test');
    });

    test('getLoggerGlobal()', async () => {
      expect(configService.getLoggerGlobal()).toEqual({ level: 'debug' });
    });

    test('getLoggerConsole()', async () => {
      expect(configService.getLoggerConsole()).toEqual({ level: 'debug' });
    });

    test('getLoggerCombined()', async () => {
      expect(configService.getLoggerCombined()).toEqual({ level: 'debug' });
    });

    test('getMongoDefaultUrl()', async () => {
      expect(configService.getMongoDefaultUrl()).toBe('mongodb://localhost:27017/lt-starter');
    });
  });
});
