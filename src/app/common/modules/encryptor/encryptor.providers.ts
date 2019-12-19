import { TWEET_NACL } from './../../constants';
import nacl from 'tweetnacl';

export const encryptorProviders = [
  {
    provide: TWEET_NACL,
    useValue: nacl,
  },
];
