import { BadRequestException, NotFoundException } from '@nestjs/common';
import { LedgerService } from './ledger.service';

describe('LedgerService', () => {
  it('rejects transfers with insufficient funds', async () => {
    const prisma = {
      transaction: { findUnique: jest.fn().mockResolvedValue(null) },
      account: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'acc_1',
          userId: 'user_1',
          balance: 100,
        }),
      },
      $transaction: jest.fn(async (cb) => {
        const tx = {
          account: {
            findUnique: jest.fn().mockResolvedValue({
              id: 'acc_1',
              userId: 'user_1',
              balance: 100,
            }),
            update: jest.fn(),
          },
          transaction: { create: jest.fn() },
          ledgerEntry: { createMany: jest.fn(), findMany: jest.fn() },
        };
        return cb(tx);
      }),
    };

    const service = new LedgerService(prisma as any, { log: jest.fn() } as any);

    await expect(
      service.processTransfer(
        {
          fromAccountId: 'acc_1',
          toAccountId: 'acc_2',
          amount: 150,
          currency: 'USD',
        },
        'user_1',
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns idempotent response when transfer already exists', async () => {
    const prisma = {
      transaction: { findUnique: jest.fn().mockResolvedValue({ id: 'txn_1' }) },
      account: { findUnique: jest.fn() },
      $transaction: jest.fn(),
    };

    const service = new LedgerService(prisma as any, { log: jest.fn() } as any);
    const result = await service.processTransfer(
      {
        fromAccountId: 'acc_1',
        toAccountId: 'acc_2',
        amount: 50,
        currency: 'USD',
        idempotencyKey: 'dup-key',
      },
      'user_1',
    );

    expect(result).toEqual({ id: 'txn_1', idempotent: true });
  });
});
