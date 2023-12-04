import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.entity';
import { FindManyOptions, MoreThan, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostEntityService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(post: Partial<PostEntity>): Promise<PostEntity> {
    const result = this.postRepository.create(post);
    return this.postRepository.save(result);
  }

  async update(
    id: number,
    post: Partial<PostEntity>,
  ): Promise<PostEntity | null> {
    await this.postRepository.update(id, post);
    return this.postRepository.findOneBy({ id });
  }

  async findLimitAndCount(
    offset?: number,
    limit?: number,
    startId?: number,
  ): Promise<[PostEntity[], number]> {
    return this.postRepository
      .createQueryBuilder()
      .where('id > :startId', { startId })
      .orderBy('post.id', 'ASC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async findOneById(id: number, other?: object): Promise<PostEntity | null> {
    return this.postRepository.findOne({ where: { id, ...other } });
  }

  async count(): Promise<number> {
    return this.postRepository.count();
  }

  /**
   * user soft delete
   */
  async delete(id: number): Promise<UpdateResult> {
    return await this.postRepository.softDelete(id);
  }

  /**
   * user hard delete(Do not use as much as possible.)
   */
  async realDelete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
