import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(
  ) {
  }

  async isHealthy(): Promise<boolean> {
    return true;
  }
}
