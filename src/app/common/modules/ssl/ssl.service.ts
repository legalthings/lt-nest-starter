import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Request } from 'express';

@Injectable()
export class SSLService {
  constructor(
    private readonly config: ConfigService,
  ) {}

  public shouldRedirect(req: Request): boolean {
    return this.config.isSSLEnabled() && this.isNotLocal(req) && this.isNotHealthEndpoint(req) && this.isNotSecure(req);
  }

  protected isNotHealthEndpoint(req: Request): boolean {
    return req.originalUrl !== '/api/health';
  }

  protected isNotLocal(req: Request): boolean {
    return req.hostname !== 'localhost';
  }

  protected isNotSecure(req: Request): boolean {
    return !req.secure && req.headers['x-forwarded-proto'] !== 'https';
  }
}
