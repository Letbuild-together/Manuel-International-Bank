import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './beneficiaries.dto';

@Controller('beneficiaries')
@UseGuards(JwtAuthGuard)
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Get()
  list(@Req() req: any) {
    return this.beneficiariesService.listByUser(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateBeneficiaryDto) {
    return this.beneficiariesService.create(req.user.id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.beneficiariesService.remove(req.user.id, id);
  }
}
