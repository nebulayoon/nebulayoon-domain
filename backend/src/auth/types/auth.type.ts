export interface ITokenBase {
  iat?: number;
  exp?: number;
}

export interface IAuthToken extends ITokenBase {
  id: number;
  name: string;
  email: string;
}

export interface IRefreshToken extends ITokenBase {
  id: number;
  name: string;
  email: string;
  uuid: string;
}

export interface IEmailVerifyToken {
  email: string;
  iat?: number;
  exp?: number;
}

export interface IUserInfo {
  name: string;
  email: string;
}

export type TTokenCase = IAuthToken | IRefreshToken | IEmailVerifyToken;
