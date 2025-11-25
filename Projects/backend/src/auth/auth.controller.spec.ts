/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call AuthService.register with correct dto', async () => {
      const dto: RegisterDto = {
        email: 'komai@test.com',
        password: 'komai123',
        first_name: 'Komai',
        last_name: 'Makarem',
      };

      const mockResult = {
        id: 1,
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.first_name,
      };
      mockAuthService.register.mockResolvedValue(mockResult);

      const result = await controller.register(dto);

      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('login', () => {
    it('should call AuthService.login with correct email and password', async () => {
      const dto: LoginUserDto = {
        email: 'komai@test.com',
        password: 'komai123',
      };

      const mockResult = { access_token: 'fake-jwt-token' };
      mockAuthService.login.mockResolvedValue(mockResult);

      const result = await controller.login(dto);

      expect(service.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(result).toEqual(mockResult);
    });
  });
});
