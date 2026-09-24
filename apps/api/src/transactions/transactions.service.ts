import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.account.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({ where: { id } });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    return account;
  }
}
