import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initEnv } from './common/env/env';

async function bootstrap() {
  await initEnv();

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 8889;

  await app.listen(port);
}

bootstrap();
