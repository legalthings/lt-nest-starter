import { Injectable } from '@nestjs/common';
import { ConfigLoaderService } from './config-loader.service';
import { join, dirname } from 'path';

@Injectable()
export class ConfigService {
  constructor(private readonly config: ConfigLoaderService) { }

  getEnv(): string {
    return this.config.get('env');
  }

  isEnv(env: 'test' | 'development' | 'production'): boolean {
    return this.getEnv() === env;
  }

  getPort(): string {
    return this.config.get('port');
  }

  isDebug(): boolean {
    return Boolean(this.config.get('debug'));
  }

  getCors(): any {
    let origin = (this.config.get('cors.origin') || '*');
    origin = origin !== '*' ? origin.split(',') : origin;
    origin = Array.isArray(origin) ?
      origin.map((string) => string !== '*' ? new RegExp(string) : string) :
      origin;

    const credentials = this.config.get('cors.credentials') || false;
    const exposedHeaders = this.config.get('cors.exposed_headers') || [];

    return {
      origin,
      credentials,
      exposedHeaders,
    };
  }

  getBodyParser(): { raw_paths: string[] } {
    return this.config.get('body_parser');
  }

  isRawPath(path: string): boolean {
    const regexp = new RegExp(path);
    const config = this.getBodyParser();
    const matches = config.raw_paths
      .map((item) => item.match(regexp))
      .filter((item) => Boolean(item));

    return Boolean(matches && matches.length);
  }

  getIndex(): string | null {
    const index = this.config.get('index');

    if (!index) {
      return null;
    }

    return join(__dirname, '..', '..', '..', '..', '..', index);
  }

  getDist(): string | null {
    const index = this.getIndex();
    return index ? dirname(index) : null;
  }

  getEncryptorKeys(): { public_key, private_key } {
    return this.config.get(`encryptor`);
  }

  getLoggerGlobal(): { level } {
    return this.config.get('log');
  }

  getLoggerConsole(): { level } {
    return this.getLoggerGlobal();
  }

  getLoggerCombined(): { level } {
    return this.getLoggerGlobal();
  }

  getRollbar(): { access_token, environment, level?} {
    return this.config.get('rollbar');
  }

  getMongoDefaultUrl(): string {
    return this.config.get('mongodb.main.url');
  }

  getMailer(): { test: boolean, options: any } {
    return this.config.get('mailer');
  }

  getAuth(): { secret: string } {
    return this.config.get('auth');
  }

  isSSLEnabled(): boolean {
    return this.config.get('ssl.enabled');
  }

  getCaptcha(): { site_key: string; secret_key: string, ssl: boolean; enabled: boolean; } {
    return this.config.get('captcha');
  }

  getMailBox(): { from: { email: string; name: string; } } {
    return this.config.get('mailbox');
  }

  getFrontend(): { url: { local: string, remote: string } } {
    return this.config.get('frontend');
  }

  getFrontendUrl(): string {
    const config = this.getFrontend();
    return this.isEnv('development') || this.isEnv('test') ? config.url.local : config.url.remote;
  }
}
