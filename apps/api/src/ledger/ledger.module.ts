import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { LedgerService } from './ledger.service';
import { CreateTransferDto } from './ledger.dto';

@Controller('ledger')
@UseGuards(JwtAuthGuard)
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post('transfer')
  @Roles('CUSTOMER', 'ADMIN', 'EMPLOYEE')
  processTransfer(@Body() dto: CreateTransferDto, @Req() req: any) {
    return this.ledgerService.processTransfer(dto, req.user.id);
  }

  @Get('accounts/:accountId')
  @Roles('CUSTOMER', 'ADMIN', 'SUPPORT', 'COMPLIANCE')
  getAccountLedger(@Param('accountId') accountId: string) {
    return this.ledgerService.getAccountLedger(accountId);
  }
}
