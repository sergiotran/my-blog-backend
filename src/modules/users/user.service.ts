import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import RegisterDto from '../auth/dtos/register.dto';
import User, { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { hashSalt } from '../auth/auth.constant';

@Injectable()
class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findOne(email: string) {
    const user = await this.model
      .findOne({
        email,
      })
      .exec();

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(user: RegisterDto) {
    try {
      const hashedPasswd = await bcrypt.hash(user.passwd, hashSalt);
      const newUser = new this.model({
        ...user,
        passwd: hashedPasswd,
      });

      return await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export default UserService;
