import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseService } from './database.service';
import { databaseProviders } from './database.providers';

export const DatabaseModuleConfig = {
  imports: [ConfigModule, LoggerModule],
  controllers: [],
  providers: [...databaseProviders, DatabaseService],
  exports: [...databaseProviders, DatabaseService],
};

@Module(DatabaseModuleConfig)
export class DatabaseModule { }
