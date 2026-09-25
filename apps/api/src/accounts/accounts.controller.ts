import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        kycStatus: true,
      },
    });
  }

  async getMe(user: any) {
    const record = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        accounts: true,
      },
    });

    if (!record) {
      throw new NotFoundException('User not found.');
    }

    const { password, ...safeUser } = record;
    return safeUser;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }
}
