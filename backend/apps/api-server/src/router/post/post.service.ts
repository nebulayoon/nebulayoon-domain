import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import { EntityService } from '../../database/main.service';
import { IAuthToken } from '../../auth/types/auth.type';
import UpdatePostDto from './dto/updatePost.dto';
import PostNotFoundException from '../../common/exception/postNotFound.exception';
import { PostEntity } from '@libs/database/entity/post.entity';
import { CustomLoggerService } from '@libs/common/log/logger.service';

@Injectable()
export class PostService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  async getPosts(
    offset?: number,
    limit?: number,
    startId?: number,
  ): Promise<{
    rows: PostEntity[];
    count: number;
  }> {
    const [rows, count] = await this.entityService.post.findLimitAndCount(
      offset,
      limit,
      startId,
    );

    return {
      rows,
      count: startId ? await this.entityService.post.count() : count,
    };
  }

  async getPostById(id: number): Promise<PostEntity> {
    const post = await this.entityService.post.findOneById(id, {
      relations: {
        author: true,
      },
    });

    if (!post) {
      this.logger.log(`PostService.getPostById() ${id} 검색 실패`);
      throw new PostNotFoundException(id);
    }

    return post;
  }

  async createPost(post: CreatePostDto, user: IAuthToken): Promise<PostEntity> {
    const userData = await this.entityService.user.findOneByEmail(user.email);
    if (!userData) {
      throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.NOT_FOUND);
    }

    const newPost = await this.entityService.post.create({
      ...post,
      author: userData,
    });

    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<PostEntity> {
    const updatePost = await this.entityService.post.update(id, post);
    if (!updatePost) {
      this.logger.log(`PostService.updatePost() ${id} 업데이트 실패`);
      throw new PostNotFoundException(id);
    }

    return updatePost;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.entityService.post.delete(id);
    if (!result.affected) {
      this.logger.log(`PostService.deletePost() ${id} 삭제 실패`);
      throw new PostNotFoundException(id);
    }
  }
}
