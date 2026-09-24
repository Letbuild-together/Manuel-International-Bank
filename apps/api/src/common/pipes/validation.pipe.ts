import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const messages = errors
      .map((error) => Object.values(error.constraints ?? {}))
      .flat()
      .join(', ');

    return new BadRequestException(messages || 'Validation failed');
  }
});
