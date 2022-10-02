import { IsNotEmpty, IsBoolean, IsString, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class BaseDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isAdmin: boolean;
}

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UserDTO extends BaseDTO {
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;
}

export class UserCreateDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDTO extends PartialType(BaseDTO) {}
