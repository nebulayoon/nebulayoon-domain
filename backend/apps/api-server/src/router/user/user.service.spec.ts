import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('ProductService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('test1', () => {
    it('should add a product and return it', async () => {
      console.log('test');
    });
  });
});
