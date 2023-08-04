export interface ITokenBase {
  iat?: number;
  exp?: number;
}

export interface IAuthToken extends ITokenBase {
  id: number;
}

export interface IRefreshToken extends ITokenBase {
  id: number;
  uuid: string;
}

export interface IEmailVerifyToken {
  email: string;
  iat?: number;
  exp?: number;
}

export type TTokenCase = IAuthToken | IRefreshToken | IEmailVerifyToken;
