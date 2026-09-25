import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log({
    actorId,
    action,
    resourceType,
    resourceId,
    details,
  }: {
    actorId?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    details?: Record<string, any>;
  }) {
    return this.prisma.auditLog.create({
      data: {
        actorId,
        action,
        resourceType,
        resourceId,
        details: details ?? {},
      },
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }
}
