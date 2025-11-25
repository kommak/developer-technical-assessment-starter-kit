import { LoginUserDto } from './login-user.dto';

describe('LoginUserDto', () => {
  it('should create a DTO with email and password', () => {
    const dto = new LoginUserDto();
    dto.email = 'komai@example.com';
    dto.password = 'securePassword123';

    expect(dto.email).toBe('komai@example.com');
    expect(dto.password).toBe('securePassword123');
  });

  it('should have undefined properties if not set', () => {
    const dto = new LoginUserDto();
    expect(dto.email).toBeUndefined();
    expect(dto.password).toBeUndefined();
  });
});
