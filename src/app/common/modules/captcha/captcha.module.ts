import { Module } from '@nestjs/common';
import { captchaProviders } from './captcha.providers';
import { CaptchaService } from './captcha.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';

export const CaptchaModuleConfig = {
  imports: [LoggerModule, ConfigModule],
  controllers: [],
  providers: [
    CaptchaService,
    ...captchaProviders,
  ],
  exports: [
    CaptchaService,
    ...captchaProviders,
  ],
};

@Module(CaptchaModuleConfig)
export class CaptchaModule { }
