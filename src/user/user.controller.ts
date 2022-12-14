import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('isAdmin') isAdmin: boolean,
  ): Promise<IUser> {
    const result = await this.userService.create({
      name,
      username,
      password,
      isAdmin,
    });
    return result;
  }
}
