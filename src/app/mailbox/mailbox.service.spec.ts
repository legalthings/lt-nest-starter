import { Test, TestingModule } from '@nestjs/testing';
import { MailboxService } from './mailbox.service';
import { MailboxModuleConfig } from './mailbox.module';
import { anyString, anything, spy, when, match } from 'ts-mockito';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { MailerService } from '../common/modules/mailer/mailer.service';
import { FilesystemService } from './../common/modules/filesystem/filesystem.service';

describe('MailboxService', () => {
  let module: TestingModule;
  let service: MailboxService;
  let auth: AuthService;
  let user: UserService;
  let mailer: MailerService;
  let filesystem: FilesystemService;

  const spies = () => {
    const mailboxService = spy(service);
    const authService = spy(auth);
    const userService = spy(user);

    const sendMail = jest.fn();
    const mailerService = jest.spyOn(mailer, 'sendMail').mockImplementation(sendMail);
    const filesystemService = spy(filesystem);

    return { mailboxService, filesystemService, authService, userService, sendMail };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule(MailboxModuleConfig).compile();

    service = module.get<MailboxService>(MailboxService);
    auth = module.get<AuthService>(AuthService);
    user = module.get<UserService>(UserService);
    mailer = module.get<MailerService>(MailerService);
    filesystem = module.get<FilesystemService>(FilesystemService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#sendForgotPasswordEmail', () => {
    it('should send a forget password email', async () => {
      const testUser = {
        email: 'johndoe@example.com'
      };
      const recipient = 'janedoe@example.com';

      const { authService, sendMail, filesystemService } = spies();
      when(authService.createConfirmationToken(anything(), anyString())).thenResolve('token');
      when(filesystemService.readFile(match('forgot-password'), anyString()))
        .thenResolve(`<a href="{{url}}">Reset your password</a>`);

      await service.sendForgotPasswordEmail(testUser as any, recipient);
      expect(sendMail.mock.calls.length).toBe(1);
      expect(sendMail.mock.calls[0][0].to).toEqual(recipient);
      expect(sendMail.mock.calls[0][0].html)
        .toEqual(`<a href="http://localhost:4200/auth/set-password?token&#x3D;token\">Reset your password</a>`);
    });
  });

  describe('#renderTemplate', () => {
    it('should render an existing template correct', async () => {
      const { filesystemService } = spies();

      when(filesystemService.readFile(match('forgot-password'), anyString()))
        .thenResolve(`<a href="{{url}}">Reset your password</a>`);

      const url = 'http://localhost';
      const expected = `<a href="${url}">Reset your password</a>`;
      const result = await service.renderTemplate('forgot-password', { url });
      expect(result).toEqual(expected);
    });
  });
});
