import { LoggerService } from './../modules/logger/logger.service';
import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
  ) { }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const time = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const path = request.path;
    const method = request.method;
    const exResponse = exception.getResponse() as any;
    const message = typeof exResponse === 'string' || Array.isArray(exResponse) ?
      exResponse : (exResponse.message || exResponse.error);
    const stack = exception.stack;

    this.logger.debug(`http-exception: '[${method}] ${path} (${status})' failed with \n${message}`, {
      stack: stack || null
    });

    response
      .status(status)
      .json({ path, method, code: status, message, time });
  }
}
