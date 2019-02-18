import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from './logger/logger.service';
import { AxiosError } from 'axios';

@Injectable()
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
  ) { }

  catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.catchHttpException(exception, host);
    }

    if ((exception as AxiosError).response) {
      return this.catchAxiosError(exception as AxiosError, host);
    }

    return this.catchError(exception, host);
  }

  catchError(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    const path = request.path;
    const method = request.method;
    const message = exception.message;
    const stack = exception.stack;

    return this.output(response, { status, path, method, message, stack });
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const path = request.path;
    const method = request.method;
    const exResponse = exception.getResponse() as any;
    const message = exResponse === 'string' ? exResponse : (exResponse.message || exResponse.error);
    const stack = exception.stack;

    return this.output(response, { status, path, method, message, stack });
  }

  catchAxiosError(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    const path = request.path;
    const method = request.method;
    const message = `${exception.message} '${exception.response.data}' at ${exception.config.url}`;
    const stack = exception.stack;

    return this.output(response, { status, path, method, message, stack });
  }

  output(response: Response, data: { status, path, method, message, stack?}) {
    this.logger
      .error(
        `global-exception: '[${data.method}] ${data.path} (${data.status})' failed with \n${data.message}`,
        {
          stack: data.stack || null
        }
      );

    response
      .status(data.status)
      .json({
        path: data.path,
        method: data.method,
        code: data.status,
        message: data.message,
        time: new Date().toISOString(),
      });
  }
}
