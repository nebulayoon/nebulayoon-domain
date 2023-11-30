import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const result = this.userRepository.create(user);
    return this.userRepository.save(result);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number, other?: object): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id, ...other } });
  }

  async findUser(user: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { ...user } });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(
    id: number,
    updateUser: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOne({ where: { id } });
  }

  async emailVerifyUpdate(email: string) {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ emailVerify: true })
      .where('email = :email', { email })
      .andWhere('deletedAt IS NULL')
      .execute();
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * user soft delete
   */
  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  /**
   * user hard delete(Do not use as much as possible.)
   */
  async realDelete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
