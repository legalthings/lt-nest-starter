import { APP_FILTER } from '@nestjs/core/constants';
import { AppExceptionFilter } from './app-exception.filter';

export const appProviders = [
  {
    provide: APP_FILTER,
    useClass: AppExceptionFilter,
  },
];
