import { UserEntity } from '@libs/database/entity';
import { PostEntity } from '@libs/database/entity/post.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  post: PostEntity;
}
