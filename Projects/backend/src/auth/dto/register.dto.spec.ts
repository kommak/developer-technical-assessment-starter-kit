import { RegisterDto } from './register-user.dto';
import { validate } from 'class-validator';

describe('RegisterDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = new RegisterDto();
    dto.email = 'test@example.com';
    dto.first_name = 'Komai';
    dto.last_name = 'Makarem';
    dto.password = 'secure123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if email is invalid', async () => {
    const dto = new RegisterDto();
    dto.email = 'invalid-email';
    dto.first_name = 'Komai';
    dto.last_name = 'Makarem';
    dto.password = 'secure123';

    const errors = await validate(dto);
    expect(errors.some((err) => err.property === 'email')).toBe(true);
  });

  it('should fail if first_name is empty', async () => {
    const dto = new RegisterDto();
    dto.email = 'test@example.com';
    dto.first_name = '';
    dto.last_name = 'Makarem';
    dto.password = 'secure123';

    const errors = await validate(dto);
    expect(errors.some((err) => err.property === 'first_name')).toBe(true);
  });

  it('should fail if last_name is empty', async () => {
    const dto = new RegisterDto();
    dto.email = 'test@example.com';
    dto.first_name = 'Komai';
    dto.last_name = '';
    dto.password = 'secure123';

    const errors = await validate(dto);
    expect(errors.some((err) => err.property === 'last_name')).toBe(true);
  });

  it('should fail if password is less than 6 characters', async () => {
    const dto = new RegisterDto();
    dto.email = 'test@example.com';
    dto.first_name = 'Komai';
    dto.last_name = 'Makarem';
    dto.password = '123';

    const errors = await validate(dto);
    expect(errors.some((err) => err.property === 'password')).toBe(true);
  });
});
