import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import UserService from './user.service';
import User, { UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
