import { TypeEnv } from '@common/env/env';
import { CustomLoggerService } from '@common/log/logger.service';

/* eslint-disable no-var */
declare global {
  var logger: CustomLoggerService;
  var env: TypeEnv;
}
