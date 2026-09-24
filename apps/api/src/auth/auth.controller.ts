import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    const result = this.authService.login(body.email, body.password);

    if (!result) {
      throw new Error('Invalid credentials');
    }

    return result;
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
