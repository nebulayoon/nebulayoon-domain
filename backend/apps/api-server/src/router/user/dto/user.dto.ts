import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from '@libs/database/entity';

export class RegisterDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
] as const) {}

export class LoginDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
