import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EntityService } from '../../database/main.service';
import CreateCommentDto from './dto/createComment.dto';
import { IAuthToken } from '../../auth/types/auth.type';
import { PostCommentEntity } from '@libs/database/entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
  ) {}

  async createComment(
    user: IAuthToken,
    commentDto: CreateCommentDto,
  ): Promise<PostCommentEntity> {
    const author = await this.entityService.user.findOneByEmail(user.email);
    if (!author) {
      throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.NOT_FOUND);
    }

    return this.entityService.comment.create({ author, ...commentDto });
  }
}
