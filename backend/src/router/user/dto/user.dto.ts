import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '@database/entity';

export class RegisterDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
