import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class HasherService {
  constructor(
  ) { }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verify(plain: string, encrypted: string): Promise<boolean> {
    if (!plain || !encrypted) {
      return false;
    }

    return bcrypt.compare(plain, encrypted);
  }
}
