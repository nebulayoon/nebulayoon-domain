import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initEnv } from './common/env/env';

async function bootstrap() {
  await initEnv();

  const app = await NestFactory.create(AppModule);
  await app.listen(8889);
}
bootstrap();
