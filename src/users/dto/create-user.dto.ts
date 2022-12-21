import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { IsEmailUnique } from '../decorators/class-validator/IsEmailUnique';
import { IsUsernameUnique } from '../decorators/class-validator/IsUsernameUnique';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/g;

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  @IsAlphanumeric()
  @IsUsernameUnique()
  username: string;

  @IsNotEmpty()
  @Length(8, 40)
  @Matches(PASSWORD_REGEX, {
    message:
      'must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
