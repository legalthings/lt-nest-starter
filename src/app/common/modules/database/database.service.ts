import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import mongoose from 'mongoose';
import delay from 'delay';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly connections: { [key: string]: mongoose.Connection } = {};

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) { }

  async onModuleInit() { }

  async onModuleDestroy() {
    await this.close();
  }

  async connect(url?: string): Promise<mongoose.Connection> {
    const key = url || this.config.getMongoDefaultUrl();

    if (this.connections[key]) {
      return this.connections[key];
    }

    this.logger.debug(`database: attempting to connect ${key}`);

    try {
      const connection = await mongoose.createConnection(key, { useNewUrlParser: true });
      this.connections.url = connection;
      this.logger.info(`database: successfully connected ${key}`);
      return connection;
    } catch (e) {
      this.logger.error(`database: failed to connect '${e}'`);
      await delay(2500);
      return this.connect();
    }
  }

  async close(url?: string): Promise<void> {
    if (url) {
      await this.connections[url].close();
      delete this.connections[url];
      return;
    }

    for (const key in this.connections) {
      if (this.connections.hasOwnProperty(key)) {
        this.logger.info(`database: closing connection ${key}`);
        this.connections[key].close();
        delete this.connections[key];
      }
    }
  }
}
