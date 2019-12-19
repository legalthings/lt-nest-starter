import { WINSTON } from './../../constants';
import winston from 'winston';

export const loggerProviders = [
  {
    provide: WINSTON,
    useValue: winston,
  },
];
