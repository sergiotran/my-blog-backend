import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import RegisterDto from './dtos/register.dto';
import JwtAuthGuard from './guards/jwt.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }
}

export default AuthController;
