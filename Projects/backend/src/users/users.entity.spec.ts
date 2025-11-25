import { User } from './users.entity';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('should have an id property', () => {
    expect(user).toHaveProperty('id');
  });

  it('should have an email property', () => {
    expect(user).toHaveProperty('email');
  });

  it('should have a password_hash property', () => {
    expect(user).toHaveProperty('password_hash');
  });

  it('should have first_name and last_name properties', () => {
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
  });

  it('should have created_at and updated_at properties', () => {
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('should allow assigning values to properties', () => {
    const now = new Date();
    user.id = 1;
    user.email = 'test@example.com';
    user.password_hash = 'hashed';
    user.first_name = 'Komai';
    user.last_name = 'Makarem';
    user.created_at = now;
    user.updated_at = now;

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.password_hash).toBe('hashed');
    expect(user.first_name).toBe('Komai');
    expect(user.last_name).toBe('Makarem');
    expect(user.created_at).toBe(now);
    expect(user.updated_at).toBe(now);
  });
});
