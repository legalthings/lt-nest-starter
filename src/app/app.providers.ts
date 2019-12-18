import { IndexExceptionFilter } from './common/filters/index-exception.filter';
import { APP_FILTER } from '@nestjs/core';

export const appProviders = [
  {
    provide: APP_FILTER,
    useClass: IndexExceptionFilter
  }
];
