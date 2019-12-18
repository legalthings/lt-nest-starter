import { CaptchaModule } from './../common/modules/captcha/captcha.module';
import { DatabaseModule } from './../common/modules/database/database.module';
import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepositoryService } from './session-repository.service';
import { SessionMiddleware } from './session.middleware';
import { SessionGuard } from './session.guard';
import { sessionProviders } from './session.providers';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

export const SessionModuleConfig = {
  imports: [CommonModule, DatabaseModule, CaptchaModule, UserModule],
  controllers: [SessionController],
  providers: [...sessionProviders, SessionService, SessionRepositoryService, SessionMiddleware, SessionGuard],
  exports: [...sessionProviders, SessionService, SessionRepositoryService, SessionMiddleware, SessionGuard],
};

@Module(SessionModuleConfig)
export class SessionModule { }
