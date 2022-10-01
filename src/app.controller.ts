import { Get, Post, Controller, UseGuards, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login((req as any).user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return (req as any).user;
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
