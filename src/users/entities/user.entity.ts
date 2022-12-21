import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  @Exclude()
  @ApiHideProperty()
  password: string;
  phone_number: string;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
