import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaModuleConfig } from './captcha.module';
import { CaptchaService } from './captcha.service';
import { RECAPTCHA } from '../../constants';

describe('CaptchaService', () => {
  let module: TestingModule;
  let captchaService: CaptchaService;
  let spies: ReturnType<typeof spy>;
  let providers: ReturnType<typeof provide>;

  function spy() {
    return {};
  }

  function provide() {
    const captchaInstance = jest.fn();
    const recaptcha = jest.fn(() => captchaInstance);

    return { recaptcha, captchaInstance };
  }

  beforeEach(async () => {
    providers = provide();

    module = await Test.createTestingModule(CaptchaModuleConfig)
      .overrideProvider(RECAPTCHA)
      .useValue(providers.recaptcha)
      .compile();
    await module.init();

    captchaService = module.get<CaptchaService>(CaptchaService);
    spies = spy();
  });

  afterEach(async () => {
    await module.close();
  });

  describe('getCaptcha()', () => {
    test('should return captcha instance', async () => {
      expect(captchaService.getCaptcha()).toBe(providers.captchaInstance);
      expect(providers.recaptcha.mock.calls.length).toBe(1);
      expect(providers.recaptcha.mock.calls).toEqual([
        [{ secretKey: '', siteKey: '', ssl: true }],
      ]);
    });
  });
});
