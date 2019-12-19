import { LoggerModule } from './../logger/logger.module';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { encryptorProviders } from './encryptor.providers';
import { EncryptorService } from './encryptor.service';

export const EncryptorModuleConfig = {
  imports: [ConfigModule, LoggerModule],
  controllers: [],
  providers: [
    ...encryptorProviders,
    EncryptorService,
  ],
  exports: [
    ...encryptorProviders,
    EncryptorService,
  ],
};

@Module(EncryptorModuleConfig)
export class EncryptorModule { }
