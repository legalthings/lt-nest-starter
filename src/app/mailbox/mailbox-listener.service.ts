import { EmitterService } from './../common/modules/emitter/emitter.service';
import { LoggerService } from './../common/modules/logger/logger.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { ActionEvents, ActionEventsReturnType } from './../action/action.events';
import { UserEventsReturnType } from './../user/user.events';

@Injectable()
export class MailboxListenerService implements OnModuleInit {
  constructor(
    private readonly logger: LoggerService,
    private readonly mailbox: MailboxService,
    private readonly actionEmitter: EmitterService<ActionEventsReturnType>,
    private readonly userEmitter: EmitterService<UserEventsReturnType>,
  ) { }

  onModuleInit() {
    this.onActionForgotPassword();
  }

  async onActionForgotPassword() {
    this.actionEmitter.on(
      ActionEvents.ActionForgotPassword,
      async (val: ActionEventsReturnType['ActionForgotPassword']) => {
        const { email } = val;
        const user = await this.mailbox.getUserByEmail(email);

        if (user) {
          this.logger.info(`mailbox-listener-service: send forgot password email to ${email}`);
          await this.mailbox.sendForgotPasswordEmail(user, email);
        }
      });
  }
}
