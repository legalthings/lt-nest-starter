import { RECAPTCHA } from '../../constants';
import recaptcha2 from 'recaptcha2';

export const captchaProviders = [
  {
    provide: RECAPTCHA,
    useValue: recaptcha2,
  },
];
