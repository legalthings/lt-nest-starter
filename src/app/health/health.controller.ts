import { CommonExceptionFilter } from './../common/filters/common-exception.filter';
import { Controller, Get, Req, Res, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { HealthService } from './health.service';

@Controller('api/health')
@ApiUseTags('health')
@UsePipes(ValidationPipe)
@UseFilters(CommonExceptionFilter)
export class HealthController {
  constructor(
    private readonly health: HealthService,
  ) { }

  @Get()
  @ApiOperation({ title: 'Health check' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 500, description: 'not healthy' })
  async check(@Req() req: Request, @Res() res: Response): Promise<Response> {
    if (!await this.health.isHealthy()) {
      return res.status(500).send('not healthy');
    }

    return res.status(200).send();
  }
}
