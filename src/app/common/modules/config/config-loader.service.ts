import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import convict from 'convict';
import { config, schema } from './data';

@Injectable()
export class ConfigLoaderService implements OnModuleInit, OnModuleDestroy {
  private config: convict.Config<any>;
  private readonly ttl: number = 300000; // 5 minutes in milliseconds
  private config_reload_interval: NodeJS.Timer;

  constructor() { }

  async onModuleInit() {
    if (!this.config) {
      await this.load();
    }

    if (!this.config_reload_interval) {
      this.config_reload_interval = setInterval(async () => {
        await this.load();
      }, this.ttl);
    }
  }

  async onModuleDestroy() {
    if (this.config_reload_interval) {
      clearInterval(this.config_reload_interval);
    }
  }

  private async load(): Promise<void> {
    this.config = convict(schema.defaultSchema);
    this.config.load(config.defaultConfig);

    const key = `${this.config.get('env')}Config`;
    if (config[key]) {
      this.config.load(config[key]);
    }

    await this.validate();
  }

  set(key: string, value: any): void {
    this.config.set(key, value);
  }

  get(key?: string): any {
    return this.config.get(key);
  }

  has(key: string): boolean {
    return this.config.has(key);
  }

  validate(): any {
    return this.config.validate({ allowed: 'warn' });
  }
}
