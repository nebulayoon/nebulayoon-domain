import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initEnv } from '@libs/common/env/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  await initEnv();

  console.log(__dirname);
  const httpsOptions = {
    key: fs.readFileSync(
      path.join(__dirname, './assets/secret/private-key.pem'),
    ),
    cert: fs.readFileSync(path.join(__dirname, './assets/secret/cert.pem')),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 12345;

  app.enableCors({
    origin: (origin, callback) => {
      const whitelist = [
        'https://192.168.0.13:3001',
        'https://nebulayoon.com',
        'http://front-nextjs',
        'https://localhost',
        'https://192.168.0.9',
        'https://nginx',
      ];
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.disable('x-powerd-by');

  app.use(cookieParser());
  // app.useLogger(app.get(CustomLoggerService));

  console.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  await app.listen(port);
}

bootstrap();
