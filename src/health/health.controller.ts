import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { HealthService } from './health.service';
import { LoggerService } from '../logger/logger.service';

@Controller('health')
@ApiUseTags('health')
export class HealthController {
  constructor() { }

  @Get()
  @ApiOperation({ title: 'Health check' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 500, description: 'service is not healthy' })
  async check(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.status(200).send();
  }
}
