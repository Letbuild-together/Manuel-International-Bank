import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.getMe(req.user);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPPORT', 'COMPLIANCE')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
