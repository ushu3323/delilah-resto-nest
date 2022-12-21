import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../../../prisma/prisma.service';

@ValidatorConstraint({ name: 'isUsernameUnique', async: true })
@Injectable()
export class IsUsernameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prismaService: PrismaService) {}

  async _findUser(username: string) {
    return await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  validate(value: string, _validationArguments?: ValidationArguments) {
    return this._findUser(value).then((user) => user === null);
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'already in use';
  }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameUniqueConstraint,
    });
  };
}
