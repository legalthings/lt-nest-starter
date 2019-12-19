import { ConfigService } from './../modules/config/config.service';
import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { exists } from 'fs';
import { promisify } from 'util';

@Injectable()
@Catch(HttpException)
export class IndexExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly config: ConfigService,
    private readonly httpException: HttpExceptionFilter,
  ) { }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const path = request.path;
    const index = await this.config.getIndex();

    if (status === 404 && index && !path.startsWith('/api') && await this.exists(index)) {
      return response.sendFile(index);
    }

    return this.httpException.catch(exception, host);
  }

  async exists(path) {
    return promisify(exists)(path);
  }
}
