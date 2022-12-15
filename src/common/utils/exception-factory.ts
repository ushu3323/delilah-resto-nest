import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';

export function exceptionFactory(errors: ValidationError[]) {
  errors.forEach((e) => {
    // Remove property name in constraint default message
    for (const k in e.constraints) {
      const constraintValue = e.constraints[k];
      if (constraintValue.startsWith(e.property)) {
        e.constraints[k] = constraintValue.replace(
          new RegExp(`^(${e.property} )`),
          '',
        );
      }
    }

    // Remove target
    e.target = undefined;
  });

  throw new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid request body, check details',
    details: errors,
  });
}
