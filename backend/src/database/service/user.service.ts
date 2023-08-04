import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const result = this.userRepository.create(user);
    return this.userRepository.save(result);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number, other?: object): Promise<User> {
    return this.userRepository.findOne({ where: { id, ...other } });
  }

  async findUser(user: Partial<User>): Promise<User> {
    return this.userRepository.findOne({ where: { ...user } });
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOne({ where: { id } });
  }

  async emailVerifyUpdate(email: string) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
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
