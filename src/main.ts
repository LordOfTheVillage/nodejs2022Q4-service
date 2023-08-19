import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { LoggerService } from './modules/logger/services/logger.service';
import { ExceptionFilter } from './modules/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(new ExceptionFilter(logger));

  process.on('uncaughtException', (error) => {
    logger.error(error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(reason as Error);
    process.exit(1);
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
}

bootstrap();
