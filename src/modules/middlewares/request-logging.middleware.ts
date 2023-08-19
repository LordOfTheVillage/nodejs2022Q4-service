import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/services/logger.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: () => void) {
    const startTime = Date.now();

    res.on('finish', async () => {
      const responseTime = Date.now() - startTime;

      await this.logger.logRequest(req, res, responseTime);
    });

    next();
  }
}
