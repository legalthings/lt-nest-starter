import { CaptchaService } from './../common/modules/captcha/captcha.service';
import { UserService } from './../user/user.service';
import { AddSessionPayload } from './api/add-session.api';
import { LoggerService } from './../common/modules/logger/logger.service';
import { ConfigService } from './../common/modules/config/config.service';
import { UserDocumentType } from './../user/models/user.model';
import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { SessionRepositoryService } from './session-repository.service';
import { SessionDocumentType } from './models/session.model';

@Injectable()
export class SessionService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly sessionRepository: SessionRepositoryService,
    private readonly user: UserService,
    private readonly captcha: CaptchaService,
  ) { }

  async getSessionById(id: string): Promise<SessionDocumentType | null> {
    return await this.sessionRepository.find({ _id: id });
  }

  async getSessionByUser(user: string): Promise<SessionDocumentType | null> {
    return await this.sessionRepository.find({ user });
  }

  async addSession(data: UserDocumentType): Promise<SessionDocumentType> {
    const session = await this.sessionRepository.new({ user: data });

    return await this.sessionRepository.save(session);
  }

  async deleteSessionById(id: string): Promise<boolean> {
    return await this.sessionRepository.delete({ _id: id });
  }

  async getOrAddSession(user: UserDocumentType): Promise<SessionDocumentType> {
    const exists = await this.getSessionByUser(user._id);
    const session = exists || await this.addSession(user);

    return session;
  }

  async authenticate(body: AddSessionPayload): Promise<SessionDocumentType | undefined> {
    const user = await this.user.getUserByEmail(body.email);
    const tooManyAttempts = user.attemptLogin();
    const catpchaResponse = tooManyAttempts && await this.captcha.validate(body.captcha_response);
    await this.user.saveUser(user);

    if (this.captcha.isEnabled() && tooManyAttempts && !catpchaResponse.success) {
      throw new HttpException(`too many failed login attempts: ${catpchaResponse.errors}`, 429);
    }

    if (!user || !await this.user.verifyPassword(user, body.password)) {
      throw new UnauthorizedException('invalid credentials');
    }

    user.clearLoginAttempts();
    await this.user.saveUser(user);

    return this.getOrAddSession(user);
  }
}
