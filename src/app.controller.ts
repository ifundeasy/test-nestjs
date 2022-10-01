import { Get, Req, Request, UseGuards, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return (req as any).user;
  }
}
