import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private sanitizeUser(user: any) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  private signToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        firstName: registerDto.firstName.trim(),
        lastName: registerDto.lastName.trim(),
        password: passwordHash,
        role: registerDto.role ?? 'CUSTOMER',
        status: 'ACTIVE',
        kycStatus: 'PENDING',
      },
    });

    const token = this.signToken(user);

    return {
      ...token,
      user: this.sanitizeUser(user),
    };
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.signToken(user);

    return {
      ...token,
      user: this.sanitizeUser(user),
    };
  }

  async getProfile(user: any) {
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        accounts: true,
      },
    });

    if (!dbUser) {
      throw new UnauthorizedException('User profile not found.');
    }

    return this.sanitizeUser(dbUser);
  }
}
