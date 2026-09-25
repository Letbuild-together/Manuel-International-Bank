import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('hashes and validates password credentials', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'u_1',
          email: 'c@example.com',
          password: '$2a$10$J7P1ICxQ3lXRz8wK5qrWAuQjQwRrWeQYp0n7sP4w7vjB4gWQOnxWK',
          role: 'CUSTOMER',
          status: 'ACTIVE',
        }),
      },
    };

    const jwt = { sign: jest.fn().mockReturnValue('signed-token') };
    const audit = { log: jest.fn() };

    const service = new AuthService(prisma as any, jwt as any, audit as any);
    const result = await service.login({ email: 'c@example.com', password: 'password123' });

    expect(result.accessToken).toBe('signed-token');
    expect(result.user.email).toBe('c@example.com');
  });
});
