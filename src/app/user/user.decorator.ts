import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserDecorator = createParamDecorator((data: any, req: Request) => {
  return (req as any).user;
});
