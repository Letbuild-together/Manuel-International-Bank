import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { CreateTransferDto } from './ledger.dto';

@Injectable()
export class LedgerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async processTransfer(dto: CreateTransferDto, userId: string) {
    const amount = Number(dto.amount);

    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be greater than zero.');
    }

    if (dto.fromAccountId === dto.toAccountId) {
      throw new BadRequestException('Transfer cannot be made to the same account.');
    }

    const idempotencyKey = dto.idempotencyKey ?? `transfer:${userId}:${Date.now()}`;

    const existing = await this.prisma.transaction.findUnique({ where: { idempotencyKey } });
    if (existing) {
      return { ...existing, idempotent: true };
    }

    return this.prisma.$transaction(async (tx) => {
      const fromAccount = await tx.account.findUnique({ where: { id: dto.fromAccountId } });
      const toAccount = await tx.account.findUnique({ where: { id: dto.toAccountId } });

      if (!fromAccount || !toAccount) {
        throw new NotFoundException('One or both accounts could not be found.');
      }

      if (Number(fromAccount.balance) < amount) {
        throw new BadRequestException('Insufficient funds for this transfer.');
      }

      if (fromAccount.userId !== userId) {
        throw new BadRequestException('You cannot transfer from an account you do not own.');
      }

      const transaction = await tx.transaction.create({
        data: {
          userId,
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          amount: new Prisma.Decimal(amount),
          currency: dto.currency,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: dto.description ?? 'Internal transfer',
          idempotencyKey,
          channel: 'INTERNAL',
        },
      });

      const fromBalanceAfter = Number(fromAccount.balance) - amount;
      const toBalanceAfter = Number(toAccount.balance) + amount;

      await tx.ledgerEntry.createMany({
        data: [
          {
            accountId: fromAccount.id,
            transactionId: transaction.id,
            type: 'DEBIT',
            amount: new Prisma.Decimal(amount),
            currency: dto.currency,
            description: 'Transfer debit',
            balanceAfter: new Prisma.Decimal(fromBalanceAfter),
          },
          {
            accountId: toAccount.id,
            transactionId: transaction.id,
            type: 'CREDIT',
            amount: new Prisma.Decimal(amount),
            currency: dto.currency,
            description: 'Transfer credit',
            balanceAfter: new Prisma.Decimal(toBalanceAfter),
          },
        ],
      });

      await tx.account.update({
        where: { id: fromAccount.id },
        data: { balance: { decrement: amount } },
      });

      await tx.account.update({
        where: { id: toAccount.id },
        data: { balance: { increment: amount } },
      });

      await this.auditService.log({
        actorId: userId,
        action: 'TRANSFER_PROCESSED',
        resourceType: 'TRANSACTION',
        resourceId: transaction.id,
        details: {
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          amount,
          currency: dto.currency,
        },
      });

      return {
        ...transaction,
        ledgerEntries: await tx.ledgerEntry.findMany({ where: { transactionId: transaction.id } }),
      };
    });
  }

  async getAccountLedger(accountId: string) {
    const account = await this.prisma.account.findUnique({ where: { id: accountId } });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    return this.prisma.ledgerEntry.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
