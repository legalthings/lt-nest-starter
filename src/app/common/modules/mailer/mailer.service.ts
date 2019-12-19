import { LoggerService } from './../logger/logger.service';
import { ConfigService } from './../config/config.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { boolean } from 'boolean';

@Injectable()
export class MailerService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) { }

  async onModuleInit() {
    const config = this.getConfig();
    this.transporter = config.test ? await this.createTestAccount() : await this.createAccount(config.options);
  }

  getConfig() {
    const config = this.config.getMailer();
    config.test = boolean(config.test);
    config.options.secure = boolean(config.options.secure);

    return config;
  }

  async createAccount(options: nodemailer.TransportOptions): Promise<nodemailer.Transporter> {
    return nodemailer.createTransport(options);
  }

  async createTestAccount(): Promise<nodemailer.Transporter> {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    const info = await this.transporter.sendMail(options);

    this.logger.debug(`mailer-service: send mail from: ${options.from} to: ${options.to} got result: ${info.response}`);

    if (this.getConfig().test) {
      this.logger.debug(`mailer-service: sent mail ${info.messageId} ${nodemailer.getTestMessageUrl(info)}`);
    }
  }
}
