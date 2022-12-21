import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { PrismaService } from '../../../prisma/prisma.service';

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async _findUser(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(email: string, _validationArguments?: ValidationArguments) {
    return this._findUser(email).then((user) => user === null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'already in use';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    return registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
