import { SessionService } from './../session/session.service';
import { SetPasswordPayload } from './api/set-password.api';
import { ActionService } from './action.service';
import { CommonExceptionFilter } from './../common/filters/common-exception.filter';
import {
  Controller, Post, Res, Body, UsePipes, ValidationPipe, UseFilters, BadRequestException
} from '@nestjs/common';
import { Response } from 'express';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForgotPasswordPayload } from './api/forgot-password.api';

@Controller('api/actions')
@ApiUseTags('action')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(CommonExceptionFilter)
export class ActionController {
  constructor(
    private readonly action: ActionService,
    private readonly session: SessionService,
  ) { }

  @Post('/forgot-password')
  @ApiOperation({ title: 'Forgot password' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 500 })
  async forgotPassword(
    @Res() res: Response,
    @Body() body: ForgotPasswordPayload,
  ) {
    await this.action.sendForgotPasswordEmail(body);

    res.status(204).send();
  }

  @Post('/set-password')
  @ApiOperation({ title: 'Set password' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 500 })
  async setPassword(
    @Res() res: Response,
    @Body() body: SetPasswordPayload,
  ) {
    const { user } = await this.action.setPassword(body);

    if (!user) {
      throw new BadRequestException(`invalid token given`);
    }

    const session = await this.session.getOrAddSession(user);

    return res.status(201)
      .cookie('session', session._id)
      .json(session);
  }
}
