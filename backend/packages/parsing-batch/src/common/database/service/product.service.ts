import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductEntityService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const result = this.productRepository.create(data);
    return this.productRepository.save(result);
  }

  async insert(data: Partial<ProductEntity>[]) {
    return this.productRepository.insert(data);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number, other?: object): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: { id, ...other },
      relations: ['stateNumber', 'monetaryUnit'],
    });
  }

  async findOneComposite(
    data: Pick<ProductEntity, 'title' | 'writer' | 'date'>,
  ): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { ...data } });
  }

  async update(
    id: number,
    updateProduct: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    await this.productRepository.update(id, updateProduct);
    return this.productRepository.findOne({ where: { id } });
  }

  async upsert(data: Partial<ProductEntity>[]) {
    return this.productRepository
      .createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values(data)
      .orUpdate(
        ['stateNumber', 'monetaryUnit', 'price', 'views', 'updatedAt'],
        ['link'],
      )
      .execute();
  }

  /**
   * product soft delete
   */
  async delete(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }

  /**
   * product hard delete(Do not use as much as possible.)
   */
  async realDelete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
