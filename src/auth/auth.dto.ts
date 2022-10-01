import { IsObject, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { UserDTO } from 'src/user';

export class SessionDTO {
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @IsDate()
  @IsNotEmpty()
  readonly expiresAt: Date;

  @IsObject()
  @IsNotEmpty()
  readonly user: UserDTO;

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;
}
