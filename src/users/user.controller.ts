import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import User from './user.schema';
import UserService from './user.service';

@Controller('user')
class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/profile/:id')
  async profile(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  selfProfile(@Req() req: Request) {
    return req.user;
  }
}

export default UserController;
