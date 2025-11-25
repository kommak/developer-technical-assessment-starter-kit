/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const sampleUser: User = {
    id: 1,
    first_name: 'Komai',
    last_name: 'Makarem',
    email: 'komaimk@makarem.com',
    password_hash: 'hashedpassword',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUsersService.findAll.mockResolvedValue([sampleUser]);
      const result = await controller.findAll();
      expect(result).toEqual([sampleUser]);
      expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const newUserData = {
        first_name: 'Komai',
        last_name: 'Makarem',
        email: 'komaimk@makarem.com',
        password_hash: 'komaimak',
      };
      mockUsersService.create.mockResolvedValue(sampleUser);

      const result = await controller.create(newUserData);
      expect(result).toEqual(sampleUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(newUserData);
    });
  });
});
