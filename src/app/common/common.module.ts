import { HttpExceptionFilter } from './filters/http-exception.filter';
import { InternalExceptionFilter } from './filters/internal-exception.filter';
import { IndexExceptionFilter } from './filters/index-exception.filter';
import { CommonExceptionFilter } from './filters/common-exception.filter';
import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RequestModule } from './modules/request/request.module';
import { EmitterModule } from './modules/emitter/emitter.module';
import { EncryptorModule } from './modules/encryptor/encryptor.module';
import { SSLModule } from './modules/ssl/ssl.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { FilesystemModule } from './modules/filesystem/filesystem.module';

export const CommonModuleConfig = {
  imports: [
    ConfigModule, LoggerModule, RequestModule, EmitterModule, EncryptorModule,
    SSLModule, MailerModule, FilesystemModule,
  ],
  controllers: [],
  providers: [
    HttpExceptionFilter, CommonExceptionFilter, IndexExceptionFilter, InternalExceptionFilter
  ],
  exports: [
    ConfigModule, LoggerModule, RequestModule, EmitterModule, EncryptorModule,
    SSLModule, MailerModule, FilesystemModule,
    HttpExceptionFilter, CommonExceptionFilter, IndexExceptionFilter, InternalExceptionFilter,
  ],
};

@Module(CommonModuleConfig)
export class CommonModule { }
