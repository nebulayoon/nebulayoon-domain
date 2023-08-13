import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initEnv } from '@libs/common/env/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  await initEnv();

  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../secret/private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../secret/cert.pem')),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  const origin = ['https://192.168.0.13:3001'];

  app.enableCors({
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.disable('x-powerd-by');

  app.use(cookieParser());
  // app.useLogger(app.get(CustomLoggerService));

  await app.listen(8888);
}
bootstrap();
