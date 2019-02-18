import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { InfoModule } from './info/info.module';
import { LoggerModule } from './logger/logger.module';
import { appProviders } from './app.providers';

export const AppModuleConfig = {
  imports: [
    ConfigModule,
    HealthModule,
    InfoModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [...appProviders],
};

@Module(AppModuleConfig)
export class AppModule {}
