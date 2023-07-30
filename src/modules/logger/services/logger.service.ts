import { Injectable, LoggerService as LG } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { stat } from 'fs/promises';
import { Request, Response } from 'express';

export enum LogLevels {
  ERROR = 'Error',
  WARN = 'Warn',
  INFO = 'Info',
  DEBUG = 'Debug',
  REQUEST = 'Request',
}

@Injectable()
export class LoggerService implements LG {
  private readonly logLevel: number;
  private readonly logFileSizeLimitKB: number;
  private readonly filePath: string = 'app.log';
  private logFileStream: WriteStream;

  constructor() {
    this.logFileStream = createWriteStream(this.filePath, { flags: 'a' });
    this.logLevel = parseInt(process.env.LOG_LEVEL, 10) || 2;
    this.logFileSizeLimitKB = Number(process.env.MAX_SIZE_LOG_FILE) || 1024;
  }

  async logRequest(req: Request, res: Response, responseTime: number) {
    const { method, originalUrl, body, query } = req;
    const { statusCode } = res;

    const logEntry = `[${
      LogLevels.REQUEST
    }] ${method} ${originalUrl} | Query: ${JSON.stringify(
      query,
    )} | Body: ${JSON.stringify(
      body,
    )} | Status: ${statusCode} | Response time: ${responseTime}ms`;

    await this.logToFile(logEntry);
  }

  private async logToFile(message: string) {
    await this.checkLogFileSize();
    this.logFileStream.write(`${message}\n`);
  }

  private async checkLogFileSize() {
    const stats = await stat(this.filePath);
    const fileSizeInKB = stats.size / 1024;
    if (fileSizeInKB >= this.logFileSizeLimitKB) {
      this.rotateLogFile();
    }
  }

  private rotateLogFile() {
    this.logFileStream.end();
    this.logFileStream = createWriteStream(this.filePath, { flags: 'a' });
  }

  private isLogLevelEnabled(level: number): boolean {
    return this.logLevel >= level;
  }

  async log(message: any, context?: string) {
    if (this.isLogLevelEnabled(2)) {
      await this.logToFile(`[${LogLevels.INFO}] [${context}] ${message}`);
    }
  }

  async error(message: any, trace?: string) {
    if (this.isLogLevelEnabled(0)) {
      await this.logToFile(`[${LogLevels.ERROR}] ${message} | Stack: ${trace}`);
    }
  }

  async warn(message: any, context?: string) {
    if (this.isLogLevelEnabled(1)) {
      await this.logToFile(`[${LogLevels.WARN}] [${context}] ${message}`);
    }
  }

  async debug(message: any, context?: string) {
    if (this.isLogLevelEnabled(3)) {
      await this.logToFile(`[${LogLevels.DEBUG}] [${context}] ${message}`);
    }
  }
}
