import { Module } from '@nestjs/common';

import { IsEmailUniqueConstraint } from './decorators/class-validator/IsEmailUnique';
import { IsUsernameUniqueConstraint } from './decorators/class-validator/IsUsernameUnique';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const classValidatorConstraints = [
  IsEmailUniqueConstraint,
  IsUsernameUniqueConstraint,
];

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...classValidatorConstraints],
})
export class UsersModule {}
