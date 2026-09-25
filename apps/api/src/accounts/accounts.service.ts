import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AccountsService } from './accounts.service';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE', 'CUSTOMER')
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE', 'CUSTOMER')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }
}
