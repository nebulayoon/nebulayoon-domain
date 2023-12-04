import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentEntity } from '../entity/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostCommentEntityService {
  constructor(
    @InjectRepository(PostCommentEntity)
    private productRepository: Repository<PostCommentEntity>,
  ) {}

  async create(data: Partial<PostCommentEntity>): Promise<PostCommentEntity> {
    const result = this.productRepository.create(data);
    return this.productRepository.save(result);
  }
}
