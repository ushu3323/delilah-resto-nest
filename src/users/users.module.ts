import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsEmailUniqueConstraint } from './decorators/class-validator/IsEmailUnique';
import { IsUsernameUniqueConstraint } from './decorators/class-validator/IsUsernameUnique';

const classValidatorConstraints = [
  IsEmailUniqueConstraint,
  IsUsernameUniqueConstraint,
];

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...classValidatorConstraints],
})
export class UsersModule {}
