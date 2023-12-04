import { IsOptional } from 'class-validator';

export interface IGetPostsParam {
  offset?: number;
  limit?: number;
  startId: number;
}
