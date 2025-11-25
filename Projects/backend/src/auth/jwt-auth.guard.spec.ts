/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should return user when no error and user exists', () => {
    const user = { id: 1, email: 'test@example.com' };

    const result = guard.handleRequest(null, user);

    expect(result).toBe(user);
  });

  it('should throw UnauthorizedException when error exists', () => {
    const error = new Error('Invalid token');

    expect(() => {
      guard.handleRequest(error, null);
    }).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when user is missing', () => {
    expect(() => {
      guard.handleRequest(null, null);
    }).toThrow(UnauthorizedException);
  });

  it('should throw correct message when user is missing', () => {
    try {
      guard.handleRequest(null, null);
    } catch (e) {
      expect(e.message).toBe('You must be logged in to access this resource');
    }
  });
});
