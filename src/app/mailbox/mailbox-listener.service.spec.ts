import { Test, TestingModule } from '@nestjs/testing';
import { MailboxListenerService } from './mailbox-listener.service';
import { MailboxModuleConfig } from './mailbox.module';
import { EmitterService } from '../common/modules/emitter/emitter.service';
import { ActionEvents, ActionEventsReturnType } from '../action/action.events';
import { anything, deepEqual, match, spy, verify, when } from 'ts-mockito';
import { MailboxService } from './mailbox.service';

describe('MailboxListenerService', () => {
  let module: TestingModule;
  let service: MailboxListenerService;
  let mailboxService: MailboxService;
  let actionEmitter: EmitterService<ActionEventsReturnType>;

  const spies = () => {
    const mockMailboxService = spy(mailboxService);

    return { mockMailboxService };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule(MailboxModuleConfig).compile();
    await module.init();

    service = module.get<MailboxListenerService>(MailboxListenerService);
    mailboxService = module.get<MailboxService>(MailboxService);
    actionEmitter = module.get<EmitterService<ActionEventsReturnType>>(EmitterService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#onActionForgotPassword', () => {
    it('should handle ActionEvents.ActionForgotPassword and send forget password mail', async () => {
      const { mockMailboxService } = spies();
      const email = 'johndoe@example.com';
      const user = {
        isVerified: jest.fn(() => true)
      };
      when(mockMailboxService.getUserByEmail(match(email))).thenResolve(user as any);
      when(mockMailboxService.sendForgotPasswordEmail(anything(), match(email))).thenResolve();

      await actionEmitter.emit(ActionEvents.ActionForgotPassword, { email });
      verify(mockMailboxService.sendForgotPasswordEmail(anything(), match(email))).once();
    });
  });
});
