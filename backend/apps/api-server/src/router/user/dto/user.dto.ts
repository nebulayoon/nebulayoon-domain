import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from '@libs/database/entity';

export class RegisterDto extends OmitType(UserEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}

export class LoginDto extends OmitType(UserEntity, [
  'id',
  'name',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
