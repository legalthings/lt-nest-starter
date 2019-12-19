import { EncryptedMessage } from './interfaces/encrypted-message.interface';
import { TWEET_NACL } from './../../constants';
import { ConfigService } from './../config/config.service';
import { Injectable, Inject } from '@nestjs/common';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

@Injectable()
export class EncryptorService {
  constructor(
    private readonly config: ConfigService,
    @Inject(TWEET_NACL) private readonly _nacl: typeof nacl,
  ) { }

  encrypt(msg: string, publicKey: string): EncryptedMessage {
    const keys = this.generateKeys();
    const nonce = this._nacl.randomBytes(this._nacl.box.nonceLength);

    const encryptedMessage = this._nacl.box(
      util.decodeUTF8(msg),
      nonce,
      util.decodeBase64(publicKey),
      util.decodeBase64(keys.private_key),
    );

    return {
      data: util.encodeBase64(encryptedMessage),
      nonce: util.encodeBase64(nonce),
      public_key: keys.public_key,
    };
  }

  decrypt(msg: EncryptedMessage, privateKey: string): string {
    return util.encodeUTF8(
      this._nacl.box.open(
        util.decodeBase64(msg.data),
        util.decodeBase64(msg.nonce),
        util.decodeBase64(msg.public_key),
        util.decodeBase64(privateKey),
      ),
    );
  }

  generateKeys(): { public_key: string, private_key: string } {
    const keys = this._nacl.box.keyPair();
    return {
      public_key: util.encodeBase64(keys.publicKey),
      private_key: util.encodeBase64(keys.secretKey),
    };
  }
}
