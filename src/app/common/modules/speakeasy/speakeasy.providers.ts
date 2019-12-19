import { SPEAKEASY } from '../../constants';
import speakeasy from 'speakeasy';

export const speakEasyProviders = [
  {
    provide: SPEAKEASY,
    useValue: speakeasy,
  },
];
