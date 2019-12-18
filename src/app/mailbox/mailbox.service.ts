import { FilesystemService } from './../common/modules/filesystem/filesystem.service';
import { MailerService } from './../common/modules/mailer/mailer.service';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { UserDocumentType } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { ConfigService } from '../common/modules/config/config.service';
import * as handlebars from 'handlebars';

@Injectable()
export class MailboxService {

  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
    private readonly filesystem: FilesystemService,
    private readonly auth: AuthService,
    private readonly user: UserService,
  ) { }

  get from(): string {
    const from = this.config.getMailBox().from;
    return `${from.name} <${from.email}>`;
  }

  async getUserByEmail(email: string): Promise<UserDocumentType | undefined> {
    return await this.user.getUserByEmail(email);
  }

  async sendForgotPasswordEmail(
    user: UserDocumentType,
    recipient: string,
  ): Promise<void> {
    const token = await this.auth.createConfirmationToken(user, 'set-password');
    const frontend = await this.config.getFrontendUrl();
    const url = `${frontend}/auth/set-password?token=${token}`;
    const html = await this.renderTemplate('forgot-password', { url });

    await this.mailer.sendMail({
      from: this.from,
      to: recipient,
      subject: 'Reset your password',
      html,
    });
  }

  async sendUserVerifyEmail(
    user: UserDocumentType,
    recipient: string,
  ): Promise<void> {
    const token = await this.auth.createConfirmationToken(user, 'verify', recipient);
    const frontend = await this.config.getFrontendUrl();
    const url = `${frontend}/verification/email?token=${token}`;
    const html = await this.renderTemplate('verify-email', { url, recipient });

    await this.mailer.sendMail({
      from: this.from,
      to: recipient,
      subject: 'Verify your email',
      html
    });
  }

  async renderTemplate(name: string, data: any): Promise<string> {
    const path = `${__dirname}/../../assets/emails/${name}.hbs.html`;
    const html = await this.filesystem.readFile(path, 'UTF-8') as string;
    const template = handlebars.compile(html.trim());
    return template(data);
  }
}
