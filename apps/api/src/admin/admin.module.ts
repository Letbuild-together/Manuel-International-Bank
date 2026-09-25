import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('review-queue')
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE', 'KYC_REVIEWER')
  getReviewQueue() {
    return this.adminService.getReviewQueue();
  }

  @Patch('kyc/:userId')
  @Roles('ADMIN', 'KYC_REVIEWER', 'COMPLIANCE')
  reviewKyc(
    @Param('userId') userId: string,
    @Body() body: { decision: 'VERIFIED' | 'REJECTED'; notes?: string },
  ) {
    return this.adminService.reviewKyc(userId, body.decision, body.notes);
  }

  @Patch('transactions/:transactionId')
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE')
  reviewTransaction(
    @Param('transactionId') transactionId: string,
    @Body() body: { decision: 'COMPLETED' | 'FAILED'; notes?: string },
  ) {
    return this.adminService.reviewTransaction(transactionId, body.decision, body.notes);
  }
}
