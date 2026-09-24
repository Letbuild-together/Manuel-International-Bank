import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return [
      { id: 'u_001', email: 'demo@manuelbank.com', firstName: 'Demo', lastName: 'Customer' },
      { id: 'u_002', email: 'ops@manuelbank.com', firstName: 'Operations', lastName: 'Team' }
    ];
  }

  getMe() {
    return {
      id: 'u_001',
      email: 'demo@manuelbank.com',
      firstName: 'Demo',
      lastName: 'Customer',
      role: 'CUSTOMER',
      kycStatus: 'VERIFIED'
    };
  }

  findOne(id: string) {
    return {
      id,
      email: 'demo@manuelbank.com',
      firstName: 'Demo',
      lastName: 'Customer',
      role: 'CUSTOMER'
    };
  }
}
