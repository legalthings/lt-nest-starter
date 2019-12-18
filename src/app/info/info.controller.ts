import { CommonExceptionFilter } from './../common/filters/common-exception.filter';
import { Get, Controller, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/info')
@ApiUseTags('info')
@UsePipes(ValidationPipe)
@UseFilters(CommonExceptionFilter)
export class InfoController {
  constructor(private readonly infoService: InfoService) { }

  @Get()
  async info() {
    return await this.infoService.info();
  }
}
