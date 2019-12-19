import { UserRoleEnum } from './../user/enums/role.enum';
import { UserDocumentType } from './../user/models/user.model';
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { SessionDocumentType } from './models/session.model';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const session = (request as any).session as SessionDocumentType;
    const user = session && session.user as UserDocumentType;

    if (!user) {
      throw new UnauthorizedException('not authenticated');
    }

    const roles = this.reflector.get<UserRoleEnum[]>('roles', context.getHandler());
    if (roles && !user.hasRole(roles)) {
      throw new ForbiddenException('not allowed');
    }

    return true;
  }
}
