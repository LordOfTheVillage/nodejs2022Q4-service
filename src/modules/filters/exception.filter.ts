import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter as EF,
} from '@nestjs/common';
import { LoggerService } from '../logger/services/logger.service';

@Catch()
export class ExceptionFilter implements EF {
  constructor(private readonly logger: LoggerService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    await this.logger.error(
      `Error occurred: ${exception.message}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
