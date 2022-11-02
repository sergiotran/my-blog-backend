import { UserDocument } from './../users/user.schema';
import { Injectable } from '@nestjs/common';
import UserService from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import RegisterDto from './dtos/register.dto';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const isMatch = await bcrypt.compare(password, user.passwd);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  async register(user: RegisterDto) {
    const newUser = await this.userService.create(user);
    return newUser;
  }

  async login(user: UserDocument) {
    const payload = {
      ...user.toJSON(),
    };
    delete payload.passwd;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export default AuthService;
