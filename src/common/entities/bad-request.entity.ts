import { ApiProperty } from '@nestjs/swagger';

class ParsedValidationError {
  property: string;
  value?: any;
  constraints?: object;
  @ApiProperty({ type: [ParsedValidationError] })
  children?: ParsedValidationError[];
}

export class BadRequestEntity {
  statusCode = 400;
  message = 'Invalid request body, see details';
  details: ParsedValidationError[];
}
