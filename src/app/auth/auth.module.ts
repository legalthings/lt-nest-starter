import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

export const AuthModuleConfig = {
  imports: [CommonModule, UserModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
};

@Module(AuthModuleConfig)
export class AuthModule { }
