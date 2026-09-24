import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export enum UserRoleDto {
  CUSTOMER = 'CUSTOMER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEnum(UserRoleDto)
  role?: UserRoleDto;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
