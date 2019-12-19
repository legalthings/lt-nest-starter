import { Module } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { MailboxListenerService } from './mailbox-listener.service';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

export const MailboxModuleConfig = {
  imports: [CommonModule, AuthModule, UserModule],
  controllers: [],
  providers: [MailboxService, MailboxListenerService],
  exports: [MailboxService],
};

@Module(MailboxModuleConfig)
export class MailboxModule { }
