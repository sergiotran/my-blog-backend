import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import RegisterDto from './dtos/register.dto';
import LocalAuthGuard from './guards/local.guard';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
}

export default AuthController;
