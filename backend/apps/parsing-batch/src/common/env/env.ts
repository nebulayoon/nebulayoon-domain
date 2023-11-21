import * as dotenv from 'dotenv';

export async function initEnv() {
  dotenv.config();

  const dev = process.env.NODE_ENV !== 'production';

  const env: TypeEnv = {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: parseInt(process.env.REDIS_PORT),
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    POSTGRES_DB_HOST: dev ? '127.0.0.1' : process.env.POSTGRES_DB_HOST,
  };

  globalThis.env = env;
}

export interface TypeEnv {
  TOKEN_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  POSTGRES_DB_HOST: string;
}
