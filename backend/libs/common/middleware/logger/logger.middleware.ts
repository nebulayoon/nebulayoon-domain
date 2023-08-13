import { CustomLoggerService } from '../../log/logger.service';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl.split('?')[0];
    const uuid = v4();
    const startTime = new Date().getTime();

    const ipAddr: string = (
      ((req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.socket.remoteAddress) as string
    )
      ?.replace('\\', '')
      .split('::ffff:')
      .reverse()[0];

    const requestLog = `[REQ][${uuid}] | ${ipAddr} | "${
      req.method
    } ${url}" ${JSON.stringify({
      ...req.query,
      ...req.body,
    })} | ${req.headers['user-agent']}`;

    this.logger.verbose(requestLog);

    res.on('finish', () => {
      const responseLog = `[RES][${uuid}] | ${ipAddr} | "${req.method} ${
        res.statusCode
      } ${url}" | ${req.headers['user-agent']} | ${(
        new Date().getTime() - startTime
      ).toLocaleString()}ms`;

      this.logger.verbose(responseLog);
    });

    next();
  }
}
