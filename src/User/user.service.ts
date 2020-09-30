import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}

  // createUser(createUserDto: CreateUserDto):Promise<User> {
  //   console.log(createUserDto)
  //   const createdUser = new this.userModel(createUserDto);
  //   console.log("Created", createdUser)
  //   return createdUser.save();
  // }
}
