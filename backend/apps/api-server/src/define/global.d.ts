import { TypeEnv } from '../common/env';

/* eslint-disable no-var */
declare global {
  var env: Readonly<TypeEnv>;
}
