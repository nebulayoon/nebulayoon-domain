import { User } from '@database/entity';
declare const RegisterDto_base: import("@nestjs/common").Type<Omit<User, "id" | "createdAt" | "updatedAt" | "deletedAt">>;
export declare class RegisterDto extends RegisterDto_base {
}
declare const LoginDto_base: import("@nestjs/common").Type<Omit<User, "id" | "name" | "createdAt" | "updatedAt" | "deletedAt">>;
export declare class LoginDto extends LoginDto_base {
}
export {};
