import { Test, TestingModule } from '@nestjs/testing';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { CommonModule } from '../common/common.module';

describe('InfoController', () => {
  let module: TestingModule;
  let infoController: InfoController;
  let infoService: InfoService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [InfoController],
      providers: [InfoService],
    }).compile();
    module.init();

    infoService = module.get<InfoService>(InfoService);
    infoController = module.get<InfoController>(InfoController);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('info', () => {
    test('should return application info', async () => {
      const result = { name: 'foo' } as any;
      jest.spyOn(infoService, 'info').mockImplementation(() => Promise.resolve(result));
      expect(await infoController.info()).toBe(result);
    });
  });
});
