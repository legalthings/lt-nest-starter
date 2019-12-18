import { FILESYSTEM } from '../../constants';
import fs from 'fs';

export const filesystemProviders = [
  {
    provide: FILESYSTEM,
    useValue: fs,
  },
];
