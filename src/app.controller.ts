import { Get, Controller, UseGuards, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth';
import { UserService } from './user';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const { user } = req as any;
    return this.userService.get({ username: user.username });
  }
}
