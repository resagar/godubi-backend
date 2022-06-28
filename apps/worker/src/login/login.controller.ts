import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';
import { LocalAuthGuard } from '@core/auth/local-auth.guard';

@Controller('api')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
