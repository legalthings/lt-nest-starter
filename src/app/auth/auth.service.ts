import { ConfigService } from './../common/modules/config/config.service';
import { UserService } from './../user/user.service';
import { UserDocumentType } from './../user/models/user.model';
import { Injectable } from '@nestjs/common';
import { sha256 } from 'js-sha256';
import Hashids from 'hashids/cjs';
import { AuthEncodedInterface } from './interfaces/encoded.interface';

@Injectable()
export class AuthService {
  readonly HASH_LENGTH = 16;

  constructor(
    private readonly config: ConfigService,
    private readonly user: UserService,
  ) { }

  createHashIds(subject: string): Hashids {
    const config = this.config.getAuth();
    const salt = sha256(config.secret + subject);

    return new Hashids(salt);
  }

  getConfirmationChecksum(id: string): string {
    const config = this.config.getAuth();
    const hash = sha256(id + config.secret);

    return hash.substr(0, this.HASH_LENGTH);
  }

  async createConfirmationToken(user: UserDocumentType, subject: string, data?: any): Promise<string> {
    const hashids = this.createHashIds(subject);
    const confirm = this.getConfirmationChecksum(user._id + user.password);
    const json = { id: user._id, confirm };

    if (data) {
      (json as any).data = data;
    }

    const string = JSON.stringify(json);
    const buffer = Buffer.from(string, 'utf8');
    const hex = buffer.toString('hex');

    return hashids.encodeHex(hex);
  }

  async verifyConfirmationToken(
    token: string, subject: string
  ): Promise<{ user: UserDocumentType | undefined, json: AuthEncodedInterface | undefined }> {
    const hashids = this.createHashIds(subject);
    const decoded = hashids.decodeHex(token);
    const buffer = Buffer.from(decoded, 'hex');
    const string = buffer && buffer.toString('utf8');
    const json = string && JSON.parse(string);
    const response = { user: undefined, json: undefined };

    if (!string || !json.id) {
      return response;
    }

    const user = await this.user.getUserByIdOrEmail(json.id);

    if (!user) {
      return response;
    }

    if (json.confirm === this.getConfirmationChecksum(json.id + user.password)) {
      response.user = user;
      response.json = json;
    }

    return response;
  }
}
