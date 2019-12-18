import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from './common/modules/config/config.service';
import { promisify } from 'util';
import { exists } from 'fs';

@Controller()
export class AppController {
  constructor(
    readonly config: ConfigService,
  ) { }

  @Get()
  @ApiExcludeEndpoint()
  async root(@Res() res: Response): Promise<void> {
    const index = this.config.getIndex();

    // note: load index file for single page applications
    if (await promisify(exists)(index)) {
      return res.sendFile(index);
    }

    return res.redirect('/api');
  }

  @Get('api')
  @ApiExcludeEndpoint()
  async api(@Res() res: Response): Promise<void> {
    return res.redirect('/api-docs');
  }
}
