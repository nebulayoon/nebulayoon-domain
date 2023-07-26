import * as dotenv from 'dotenv';

export async function initEnv() {
  dotenv.config();

  const env: TypeEnv = {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: parseInt(process.env.REDIS_PORT),
  };

  globalThis.env = env;
}

export interface TypeEnv {
  TOKEN_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}
