import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class TimeService {
  public getTime(time?: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(time).tz('Asia/Seoul').format(format).toString();
  }
}
