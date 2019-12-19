import { CommonExceptionFilter } from './../common/filters/common-exception.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AddSessionPayload, AddSessionResponse201 } from './api/add-session.api';
import { GetSessionParams, GetSessionResponse200 } from './api/get-session.api';
import { SessionService } from './session.service';

@Controller('api/sessions')
@ApiUseTags('session')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(CommonExceptionFilter)
export class SessionController {
  constructor(
    private readonly session: SessionService,
  ) { }

  @Get('/:id')
  @ApiOperation({ title: 'Get session by id' })
  @ApiResponse({ status: 200, type: GetSessionResponse200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async get(@Res() res: Response, @Param() params: GetSessionParams) {
    const session = await this.session.getSessionById(params.id);

    if (!session) {
      throw new NotFoundException('session not found');
    }

    return res.status(200).json(session);
  }

  @Post()
  @ApiOperation({ title: 'Add session' })
  @ApiResponse({
    status: 201, type: AddSessionResponse201,
    headers: { 'Set-Cookie': { description: 'session=000000000000000000000001' } }
  })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 429 })
  @ApiResponse({ status: 500 })
  async add(@Res() res: Response, @Body() body: AddSessionPayload) {
    const session = await this.session.authenticate(body);

    if (!session) {
      return;
    }

    return res.status(201)
      .cookie('session', session._id)
      .json(session);
  }

  @Delete('/:id')
  @ApiOperation({ title: 'Delete session by id' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 500 })
  async delete(@Res() res: Response, @Param() params: GetSessionParams) {
    await this.session.deleteSessionById(params.id);

    return res.status(204).send();
  }
}
