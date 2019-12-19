import { Module } from '@nestjs/common';
import { speakEasyProviders } from './speakeasy.providers';
import { SpeakEasyService } from './speakeasy.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';

export const SpeakEasyModuleConfig = {
  imports: [LoggerModule, ConfigModule],
  controllers: [],
  providers: [
    SpeakEasyService,
    ...speakEasyProviders,
  ],
  exports: [
    SpeakEasyService,
    ...speakEasyProviders,
  ],
};

@Module(SpeakEasyModuleConfig)
export class SpeakEasyModule { }
