import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Manuel International Bank API',
      version: '1.0.0',
      status: 'ok',
      features: ['authentication', 'accounts', 'transactions', 'dashboard']
    };
  }
}
