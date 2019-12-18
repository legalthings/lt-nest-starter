import { SSLService } from './ssl.service';
import { LoggerModule } from './../logger/logger.module';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { SSLMiddleware } from './ssl.middleware';

export const SSLModuleConfig = {
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  providers: [
    SSLMiddleware,
    SSLService,
  ],
  exports: [
    SSLMiddleware,
    SSLService,
  ],
};

@Module(SSLModuleConfig)
export class SSLModule { }
