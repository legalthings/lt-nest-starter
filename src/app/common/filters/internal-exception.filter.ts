import { ConfigService } from './../modules/config/config.service';
import { LoggerService } from './../modules/logger/logger.service';
import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';

@Injectable()
@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) { }

  async catch(exception: Error, host: ArgumentsHost) {
    const time = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    const path = request.path;
    const method = request.method;
    const message = this.config.isDebug() ? exception.message : 'internal server error';
    const stack = exception.stack;

    this.logger.error(`internal-exception: '[${method}] ${path} (${status})' failed with \n${message}`, {
      stack: stack || null
    });

    response
      .status(status)
      .json({ path, method, code: status, message, time });
  }
}
