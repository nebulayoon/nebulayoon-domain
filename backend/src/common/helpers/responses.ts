import { HttpStatus } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly statusCode: HttpStatus;
  @Exclude() private readonly message: Array<string>;
  @Exclude() private readonly data: T;

  private constructor(status: HttpStatus, message: Array<string>, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, ['success'], '');
  }

  static OK_WITH(message: Array<string>): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, message, '');
  }

  static OK_WITH_DATA<T>(message: Array<string>, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, message, data);
  }

  static FAILED(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.BAD_REQUEST, ['failed'], '');
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      HttpStatus.INTERNAL_SERVER_ERROR,
      ['서버 에러가 발생했습니다.'],
      '',
    );
  }

  static ERROR_WITH_DATA<T>(
    message: Array<string>,
    code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

  @Expose()
  get getStatusCode(): HttpStatus {
    return this.statusCode;
  }

  @Expose()
  get getMessage(): Array<string> {
    return this.message;
  }

  @Expose()
  get getData(): T {
    return this.data;
  }
}
