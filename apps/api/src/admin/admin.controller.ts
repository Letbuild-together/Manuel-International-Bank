import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async getReviewQueue() {
    const users = await this.prisma.user.findMany({
      where: { kycStatus: 'PENDING' },
      include: { accounts: true },
    });

    const transactions = await this.prisma.transaction.findMany({
      where: { status: { in: ['PENDING', 'PROCESSING', 'FAILED'] } },
      include: { fromAccount: true, toAccount: true },
    });

    return {
      users,
      transactions,
    };
  }

  async reviewKyc(userId: string, decision: 'VERIFIED' | 'REJECTED', notes?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: decision, status: decision === 'VERIFIED' ? 'ACTIVE' : 'PENDING' },
    });

    await this.auditService.log({
      actorId: userId,
      action: `KYC_${decision}`,
      resourceType: 'USER',
      resourceId: userId,
      details: { notes },
    });

    return updated;
  }

  async reviewTransaction(transactionId: string, decision: 'COMPLETED' | 'FAILED', notes?: string) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id: transactionId } });

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    const updated = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: { status: decision },
    });

    await this.auditService.log({
      action: `TRANSACTION_${decision}`,
      resourceType: 'TRANSACTION',
      resourceId: transactionId,
      details: { notes },
    });

    return updated;
  }
}
