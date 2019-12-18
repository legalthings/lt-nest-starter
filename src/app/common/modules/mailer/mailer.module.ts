import { Module } from '@nestjs/common';
import { mailerProviders } from './mailer.providers';
import { MailerService } from './mailer.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';

export const MailerModuleConfig = {
  imports: [LoggerModule, ConfigModule],
  controllers: [],
  providers: [
    ...mailerProviders,
    MailerService,
  ],
  exports: [
    ...mailerProviders,
    MailerService,
  ],
};

@Module(MailerModuleConfig)
export class MailerModule { }
