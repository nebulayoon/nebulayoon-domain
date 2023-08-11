export declare function initEnv(): Promise<void>;
export interface TypeEnv {
    TOKEN_SECRET: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
}
