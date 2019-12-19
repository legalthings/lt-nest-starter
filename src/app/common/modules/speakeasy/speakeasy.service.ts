import { ConfigService } from './../config/config.service';
import { Injectable, Inject } from '@nestjs/common';
import { SPEAKEASY } from '../../constants';
import se from 'speakeasy';
import qrcode from 'qrcode';

@Injectable()
export class SpeakEasyService {
  constructor(
    private readonly config: ConfigService,
    @Inject(SPEAKEASY) private readonly mfa: typeof se,
  ) { }

  generateSecret(options: se.GenerateSecretOptions = { length: 20 }): se.GeneratedSecret {
    return this.mfa.generateSecret(options);
  }

  getTotp(options: se.TotpOptions): string {
    return this.mfa.totp(options);
  }

  verifyTotp(options: se.TotpVerifyOptions): boolean {
    return this.mfa.totp.verify(options);
  }

  getOtpAuthUrlFromSecret(secret: string, email: string, issuerName?: string): string {
    const issuer = issuerName || this.config.getMfa().issuer;
    return `otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}`;
  }

  getQrCodeAsDataUrl(otpAuthUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      qrcode.toDataURL(otpAuthUrl, (err, dataUrl) => {
        err ? reject(err) : resolve(dataUrl);
      });
    });
  }

  async getQrCodeAsImage(otpAuthUrl: string): Promise<string> {
    const dataUrl = await this.getQrCodeAsDataUrl(otpAuthUrl);
    return `<img src="${dataUrl}">`;
  }
}
