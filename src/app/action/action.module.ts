import { SessionModule } from './../session/session.module';
import { ActionService } from './action.service';
import { actionProviders } from './action.providers';
import { ActionController } from './action.controller';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';

export const actionModuleConfig = {
  imports: [CommonModule, UserModule, AuthModule, SessionModule],
  controllers: [ActionController],
  providers: [...actionProviders, ActionService],
  exports: [...actionProviders, ActionService],
};

@Module(actionModuleConfig)
export class ActionModule { }
