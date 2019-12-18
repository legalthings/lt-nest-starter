import { Injectable, Inject } from '@nestjs/common';
import { FILESYSTEM } from '../../constants';
import { promisify } from 'util';
import fs from 'fs';

@Injectable()
export class FilesystemService {
  constructor(
    @Inject(FILESYSTEM) private readonly filesystem: typeof fs,
  ) { }

  async readFile(path: string, encoding?: string): Promise<string | Buffer> {
    return promisify(this.filesystem.readFile)(path, { encoding });
  }
}
