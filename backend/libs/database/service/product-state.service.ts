import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStateEntityService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const result = this.productRepository.create(data);
    return this.productRepository.save(result);
  }
}
