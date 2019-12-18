import { CaptchaService } from './../common/modules/captcha/captcha.service';
import { AddUserPayload, AddUserResponse201 } from './api/add-user.api';
import { UpdateUserParams, UpdateUserPayload, UpdateUserResponse200 } from './api/update-user.api';
import { GetUserParams, GetUserResponse200 } from './api/get-user.api';
import { CommonExceptionFilter } from './../common/filters/common-exception.filter';
import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { SessionGuard } from '../session/session.guard';
import { UserDecorator as User } from './user.decorator';
import { UserDocumentType } from './models/user.model';

@Controller('api/users')
@ApiUseTags('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(CommonExceptionFilter)
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly captcha: CaptchaService,
  ) { }

  @Get('/:id')
  @ApiOperation({ title: 'Get user by id or email' })
  @ApiResponse({ status: 200, type: GetUserResponse200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async get(@Res() res: Response, @Param() params: GetUserParams) {
    const user = await this.user.getUserByIdOrEmail(params.id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return res.status(200).json(user);
  }

  @Post()
  @ApiOperation({ title: 'Add user' })
  @ApiResponse({ status: 201, type: AddUserResponse201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async add(
    @Res() res: Response,
    @Body() body: AddUserPayload,
    @User() sessionUser: UserDocumentType
  ) {
    if (!sessionUser) {
      const catpchaResponse = await this.captcha.validate(body.captcha_response);
      if (this.captcha.isEnabled() && !catpchaResponse.success) {
        throw new BadRequestException(`invalid captcha response given: ${catpchaResponse.errors}`);
      }
    }

    const exists = await this.user.getUserByIdOrEmail(body.email);

    if (exists) {
      throw new ConflictException('user already exists');
    }

    const user = await this.user.addUser(body as any);

    return res.status(201).json(user);
  }

  @Post('/:id')
  @UseGuards(SessionGuard)
  @ApiOperation({ title: 'Update user by id or email' })
  @ApiResponse({ status: 200, type: UpdateUserResponse200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async update(
    @Res() res: Response,
    @Param() params: UpdateUserParams,
    @Body() body: UpdateUserPayload,
    @User() sessionUser: UserDocumentType
  ) {
    const user = await this.user.getUserByIdOrEmail(params.id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!user.is(sessionUser)) {
      throw new ForbiddenException('not allowed');
    }

    if (body.password && (!body.old_password || !await this.user.verifyPassword(user, body.old_password))) {
      // @todo: should add brute force protection
      throw new ForbiddenException('invalid old_password given');
    }

    await this.user.updateUser(user, body);

    return res.status(200).json(user);
  }
}
