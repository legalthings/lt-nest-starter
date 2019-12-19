import { ConfigService } from './../common/modules/config/config.service';
import { Injectable } from '@nestjs/common';
import util from 'util';
import fs from 'fs';

@Injectable()
export class InfoService {
  constructor(private readonly config: ConfigService) { }

  async info() {
    const data = await util.promisify(fs.readFile)('package.json', { encoding: 'utf8' });
    const json = JSON.parse(data);

    return {
      name: json.name,
      version: json.version,
      description: json.description,
      env: this.config.getEnv(),
    };
  }
}
