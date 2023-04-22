import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Winston } from './infrastructure/logger';
import { Logger } from '@nestjs/common';

function getLogger() {
  return new Winston({
    app: process.env.APPNAME,
    job: process.env.APPNAME,
    level: process.env.LOGGER_LEVEL,
    loggerUrl: process.env.LOGGER_HOST,
  });
}

async function bootstrap() {
  const logger = getLogger();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });
  await app.listen(process.env.PORT);
}

bootstrap().then(() =>
  Logger.log(
    `e-cart listening on PORT ${process.env.PORT} 👍. Be happy 😀 !`,
  ),
);
