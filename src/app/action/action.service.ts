import { UserService } from './../user/user.service';
import { UserDocumentType } from './../user/models/user.model';
import { SetPasswordPayload } from './api/set-password.api';
import { AuthService } from './../auth/auth.service';
import { ActionEvents, ActionEventsReturnType } from './action.events';
import { EmitterService } from './../common/modules/emitter/emitter.service';
import { ForgotPasswordPayload } from './api/forgot-password.api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {
  constructor(
    private readonly emitter: EmitterService<ActionEventsReturnType>,
    private readonly auth: AuthService,
    private readonly user: UserService,
  ) { }

  async sendForgotPasswordEmail(data: ForgotPasswordPayload): Promise<void> {
    this.emitter.emit(ActionEvents.ActionForgotPassword, { email: data.email });
  }

  async setPassword(data: SetPasswordPayload): Promise<{ user: UserDocumentType | undefined }> {
    const { user } = await this.auth.verifyConfirmationToken(data.token, 'set-password');
    const response = { user: undefined };

    if (user) {
      response.user = user;
      await this.user.setPassword(user, data.password);
      user.clearLoginAttempts();
      await this.user.saveUser(user);
    }

    return response;
  }
}
