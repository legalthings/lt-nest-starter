import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from './session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly session: SessionService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.header('x-session') || (req.cookies && req.cookies.session);
    const session = sessionId && await this.session.getSessionById(sessionId);

    if (session) {
      (req as any).session = session;
      (req as any).user = session.user;
    }

    next();
  }
}
