import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { appProviders } from './app.providers';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { InfoModule } from './info/info.module';
import { HealthModule } from './health/health.module';
import { SSLMiddleware } from './common/modules/ssl/ssl.middleware';
import { ActionModule } from './action/action.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { MailboxModule } from './mailbox/mailbox.module';
import { AuthModule } from './auth/auth.module';
import { HasherModule } from './hasher/hasher.module';

export const AppModuleConfig = {
  imports: [
    CommonModule,
    DatabaseModule,
    InfoModule,
    HealthModule,
    HasherModule,
    AuthModule,
    ActionModule,
    UserModule,
    SessionModule,
    MailboxModule,
  ],
  controllers: [AppController],
  providers: [...appProviders],
};

@Module(AppModuleConfig)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SSLMiddleware,
      )
      .forRoutes('*');
  }
}
