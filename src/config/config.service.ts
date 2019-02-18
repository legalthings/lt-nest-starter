import { Injectable } from '@nestjs/common';
import { ConfigLoaderService } from './config-loader.service';

@Injectable()
export class ConfigService {
  constructor(private readonly config: ConfigLoaderService) { }

  getEnv(): string {
    return this.config.get('env');
  }

  getPort(): string {
    return this.config.get('port');
  }

  getAuthToken(): string {
    return this.config.get('auth.token');
  }

  getAnchorUrl(): string {
    return this.config.get('anchor.url');
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
}
