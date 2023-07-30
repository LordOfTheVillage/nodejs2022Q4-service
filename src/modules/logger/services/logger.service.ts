import { Injectable } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { Request, Response } from 'express';

@Injectable()
export class LoggerService {
  private logFileStream: WriteStream;

  constructor() {
    this.logFileStream = createWriteStream('app.log', { flags: 'a' });
  }

  logRequest(req: Request, res: Response) {
    const { method, originalUrl, body, query } = req;
    const { statusCode } = res;

    const logEntry = `[Request] ${method} ${originalUrl} | Query: ${JSON.stringify(
      query,
    )} | Body: ${JSON.stringify(body)} | Status: ${statusCode}`;

    this.logToFile(logEntry);
  }

  logError(error: Error) {
    const logEntry = `[Error] ${error.message} | Stack: ${error.stack}`;
    this.logToFile(logEntry);
  }

  private logToFile(message: string) {
    this.logFileStream.write(`${message}\n`);
  }
}
