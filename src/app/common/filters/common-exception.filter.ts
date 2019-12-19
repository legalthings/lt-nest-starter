import { InternalExceptionFilter } from './internal-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { ExceptionFilter, Catch, ArgumentsHost, Injectable, HttpException } from '@nestjs/common';

@Injectable()
@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpException: HttpExceptionFilter,
    private readonly internalException: InternalExceptionFilter,
  ) { }

  async catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.httpException.catch(exception, host);
    }

    return this.internalException.catch(exception, host);
  }
}
