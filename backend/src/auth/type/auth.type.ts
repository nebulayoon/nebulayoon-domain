export interface tokenBase {
  iat?: number;
  exp?: number;
}

export interface IAuthToken extends tokenBase {
  id: number;
}

export interface IRefreshToken extends tokenBase {
  id: number;
  uuid: string;
}
