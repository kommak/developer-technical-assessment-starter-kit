/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-user.dto';
import { User } from '../users/users.entity';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: any;
  let mockJwtService: any;

  beforeEach(async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    mockUsersService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };
    mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // Cast bcrypt methods as mocks
    (bcrypt.genSalt as jest.Mock).mockClear();
    (bcrypt.hash as jest.Mock).mockClear();
    (bcrypt.compare as jest.Mock).mockClear();
  });

  it('should create a new user and return user data without password', async () => {
    const dto: RegisterDto = {
      email: 'test@example.com',
      first_name: 'Komai',
      last_name: 'Makarem',
      password: 'hashedpassword',
    };

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

    const createdUser = {
      id: 1,
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      password_hash: 'hashedpassword',
    };

    mockUsersService.create.mockResolvedValue(createdUser);

    const result = await service.register(dto);

    expect(result).toEqual({
      id: 1,
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
    });
    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 'salt');
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password_hash: 'hashedpassword',
    };
    mockUsersService.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login(mockUser.email, 'wrongpassword'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return access token if login is successful', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password_hash: 'hashedpassword',
    };
    mockUsersService.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await service.login(mockUser.email, 'password123');

    expect(result).toEqual({ access_token: 'jwt-token' });
  });
});
