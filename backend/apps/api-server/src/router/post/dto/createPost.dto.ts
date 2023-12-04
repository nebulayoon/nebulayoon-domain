import { IsString, IsNotEmpty } from 'class-validator';

export default class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
