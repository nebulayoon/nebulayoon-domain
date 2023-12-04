import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class UpdatePostDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
