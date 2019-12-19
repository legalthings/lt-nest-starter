import { SetMetadata } from '@nestjs/common';

export const UserRoleDecorator = (...roles: string[]) => SetMetadata('roles', roles);
