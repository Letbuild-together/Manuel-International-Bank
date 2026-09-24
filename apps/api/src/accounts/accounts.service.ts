import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  findAll() {
    return [
      {
        id: 'acc_001',
        iban: 'MIBUS56USD123456789',
        type: 'CHECKING',
        balance: 42860.12,
        currency: 'USD',
        status: 'ACTIVE'
      },
      {
        id: 'acc_002',
        iban: 'MIBUS56EUR987654321',
        type: 'SAVINGS',
        balance: 124200.4,
        currency: 'EUR',
        status: 'ACTIVE'
      }
    ];
  }

  findOne(id: string) {
    return {
      id,
      iban: 'MIBUS56USD123456789',
      type: 'CHECKING',
      balance: 42860.12,
      currency: 'USD',
      status: 'ACTIVE'
    };
  }
}
