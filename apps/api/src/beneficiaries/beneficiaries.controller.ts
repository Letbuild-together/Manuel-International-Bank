import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBeneficiaryDto } from './beneficiaries.dto';

@Injectable()
export class BeneficiariesService {
  constructor(private readonly prisma: PrismaService) {}

  async listByUser(userId: string) {
    return this.prisma.beneficiary.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateBeneficiaryDto) {
    return this.prisma.beneficiary.create({
      data: {
        userId,
        name: dto.name,
        nickname: dto.nickname,
        bankName: dto.bankName,
        accountNumber: dto.accountNumber,
        iban: dto.iban,
        country: dto.country,
      },
    });
  }

  async remove(userId: string, beneficiaryId: string) {
    const beneficiary = await this.prisma.beneficiary.findFirst({
      where: { id: beneficiaryId, userId },
    });

    if (!beneficiary) {
      throw new NotFoundException('Beneficiary not found.');
    }

    return this.prisma.beneficiary.delete({ where: { id: beneficiaryId } });
  }
}
