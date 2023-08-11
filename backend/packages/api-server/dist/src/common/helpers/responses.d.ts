import { HttpStatus } from '@nestjs/common';
export declare class ResponseEntity<T> {
    private readonly statusCode;
    private readonly message;
    private readonly data;
    private constructor();
    static CREATED(): ResponseEntity<string>;
    static OK(): ResponseEntity<string>;
    static OK_WITH(message: Array<string>): ResponseEntity<string>;
    static OK_WITH_DATA<T>(message: Array<string>, data: T): ResponseEntity<T>;
    static FAILED(): ResponseEntity<string>;
    static ERROR(): ResponseEntity<string>;
    static ERROR_WITH_DATA<T>(message: Array<string>, code: HttpStatus, data: T): ResponseEntity<T>;
    get getStatusCode(): HttpStatus;
    get getMessage(): Array<string>;
    get getData(): T;
}
