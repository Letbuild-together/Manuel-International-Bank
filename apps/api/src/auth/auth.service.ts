import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  login(email: string, password: string) {
    if (email !== 'demo@manuelbank.com' || password !== 'P@ssword123') {
      return null;
    }

    const payload = {
      sub: 'demo-user-id',
      email,
      role: 'CUSTOMER'
    };

    const secret = this.configService.get<string>('JWT_SECRET', 'dev-secret');
    const expiresIn = this.configService.get<number>('JWT_EXPIRES_IN', 3600);

    return {
      accessToken: sign(payload, secret, { expiresIn }),
      user: {
        id: 'demo-user-id',
        email,
        firstName: 'Demo',
        lastName: 'Customer'
      }
    };
  }

  register(payload: { email: string; password: string; firstName: string; lastName: string }) {
    return {
      message: 'Registration request received',
      user: {
        id: 'generated-user-id',
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      }
    };
  }
}
