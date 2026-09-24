import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  findAll() {
    return [
      {
        id: 'txn_001',
        type: 'DEPOSIT',
        amount: 8540,
        currency: 'USD',
        status: 'COMPLETED',
        description: 'Payroll deposit'
      },
      {
        id: 'txn_002',
        type: 'TRANSFER',
        amount: 1200,
        currency: 'USD',
        status: 'PENDING',
        description: 'Global operations transfer'
      }
    ];
  }

  findOne(id: string) {
    return {
      id,
      type: 'TRANSFER',
      amount: 1200,
      currency: 'USD',
      status: 'COMPLETED',
      description: 'Global operations transfer'
    };
  }
}
