import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategoryEntity } from '../entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostCategoryEntityService {
  constructor(
    @InjectRepository(PostCategoryEntity)
    private productRepository: Repository<PostCategoryEntity>,
  ) {}

  async create(data: Partial<PostCategoryEntity>): Promise<PostCategoryEntity> {
    const result = this.productRepository.create(data);
    return this.productRepository.save(result);
  }
}
