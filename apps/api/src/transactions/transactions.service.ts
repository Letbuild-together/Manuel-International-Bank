import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE', 'CUSTOMER')
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE', 'CUSTOMER')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
