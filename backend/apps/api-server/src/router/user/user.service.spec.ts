import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { UserEntity } from '@libs/database/entity';
import { hashSync } from 'bcrypt';
import { EntityService } from '../../database/main.service';
import { AuthService } from '../../auth/auth.service';
import { RedisRepository } from '../../database/redis/redis';
import { CustomLoggerService } from '@libs/common/log/logger.service';
import { MailService } from '../../mail/mail.service';

const mockRegisterUser: RegisterDto = {
  name: 'test0',
  email: 'test0@gmail.com',
  password: '1111',
};

const mockUser: UserEntity = {
  id: 0,
  name: 'test0',
  email: 'test0@gmail.com',
  password: hashSync(mockRegisterUser.password, 10),
  emailVerify: false,
  activation: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};

const mockUserDB: UserEntity = {
  id: 100,
  name: 'test100',
  email: 'test100@gmail.com',
  password: hashSync(mockRegisterUser.password, 10),
  emailVerify: false,
  activation: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};

const MockEntityService = () => ({
  user: mockUserEntityService(),
});

const mockUserEntityService = () => ({
  findOneByEmail: async (email: string) => {
    if (email === mockUserDB.email) return mockUserDB;
    else return null;
  },

  create: jest.fn().mockResolvedValue(mockUser),
});

class MockAuthService {
  getAccessToken = jest.fn();
  getRefreshToken = jest.fn();
}

class MockRedisRepository {
  get = jest.fn();
}

class MockCustomLoggerService {
  error = jest.fn();
}

class MockMailService {
  sendMemberJoinVerification = jest.fn();
}

describe('ProductService', () => {
  let userService: UserService;
  let entityService: EntityService;
  let authService: AuthService;
  let redisRepository: RedisRepository;
  let logger: CustomLoggerService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: EntityService,
          useValue: MockEntityService(),
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RedisRepository, useClass: MockRedisRepository },
        { provide: CustomLoggerService, useClass: MockCustomLoggerService },
        { provide: MailService, useClass: MockMailService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    entityService = module.get<EntityService>(EntityService);
    authService = module.get<AuthService>(AuthService);
    redisRepository = module.get<RedisRepository>(AuthService);
    logger = module.get<CustomLoggerService>(AuthService);
    mailService = module.get<MailService>(AuthService);
  });

  describe('UserService.register()', () => {
    const newUser: RegisterDto = {
      name: 'new',
      email: 'new@gmail.com',
      password: '1234',
    };

    const existedUser: RegisterDto = {
      name: mockUserDB.name,
      email: mockUserDB.email,
      password: mockUserDB.password,
    };

    const createdUser = mockUser;

    it('[정상 | 유저 생성] 유저 정보를 인자로 받고 새로운 유저를 생성 후 반환한다. password는 빈 문자열이다.', async () => {
      const expectResult = createdUser;
      expectResult.password = '';

      expect(await userService.register(mockRegisterUser)).toEqual(
        expectResult,
      );
    });

    it('[예외 | 유일성 검사] 유저의 이메일은 DB에서 유일해야 한다.', async () => {
      expect(entityService.user.findOneByEmail).toBeDefined();
      expect(userService.register(newUser)).resolves;
      await expect(userService.register(existedUser)).rejects.toThrow(
        '이미 존재하는 유저입니다.',
      );
    });
  });

  describe('UserService.login()', () => {
    it('[예외 | 잘못된 인증 정보] 올바른 유저 이메일을 인자로 받아야 한다.', async () => {
      const wrongUser: LoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };

      await expect(userService.login(wrongUser)).rejects.toThrow(
        '잘못된 인증 정보입니다.',
      );
    });

    it('[예외 | 패스워드 비교] DB에 저장된 패스워드와 입력받은 패스워드가 같아야 한다.', async () => {
      const wrongPasswordUser: LoginDto = {
        email: mockUserDB.email,
        password: 'wrongPassword',
      };

      await expect(userService.login(wrongPasswordUser)).rejects.toThrow(
        '잘못된 인증 정보입니다.',
      );
    });

    it('[예외 | 이메일 인증] 이메일 인증을 받은 유저만 로그인이 가능하다.', async () => {
      const user: LoginDto = {
        email: mockUserDB.email,
        password: mockRegisterUser.password,
      };

      jest
        .spyOn(entityService.user, 'findOneByEmail')
        .mockResolvedValue(mockUserDB);

      await expect(userService.login(user)).rejects.toThrow(
        '이메일 인증이 필요합니다.',
      );
    });
  });
});
