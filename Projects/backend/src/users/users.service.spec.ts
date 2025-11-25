/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const sampleUser: User = {
    id: 1,
    first_name: 'Komai',
    last_name: 'Makarem',
    email: 'komaimk@kmkm.com',
    password_hash: 'hashedpassword',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockRepo.find.mockResolvedValue([sampleUser]);
      const result = await service.findAll();
      expect(result).toEqual([sampleUser]);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      mockRepo.findOneBy.mockResolvedValue(sampleUser);
      const result = await service.findById(1);
      expect(result).toEqual(sampleUser);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const newUserData = {
        first_name: 'Komai',
        last_name: 'Makarem',
        email: 'komaimk@kmkm.com',
        password_hash: 'hashedpassword',
      };
      mockRepo.create.mockReturnValue(newUserData as any);
      mockRepo.save.mockResolvedValue(sampleUser);

      const result = await service.create(newUserData);
      expect(result).toEqual(sampleUser);
      expect(mockRepo.create).toHaveBeenCalledWith(newUserData);
      expect(mockRepo.save).toHaveBeenCalledWith(newUserData);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockRepo.findOneBy.mockResolvedValue(sampleUser);
      const result = await service.findByEmail('komaimk@kmkm.com');
      expect(result).toEqual(sampleUser);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({
        email: 'komaimk@kmkm.com',
      });
    });
  });
});
