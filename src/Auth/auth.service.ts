import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { ISignInResponse } from './interfaces/sign-in-response.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in-dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  //Helper Methods
  private async hashPassword(password: string, salt:string): Promise<string>{
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, user:User): Promise<boolean>{
    const hash = await this.hashPassword(password,user.salt);
    return hash === user.password; 
  }


  async signUp(createUserDto: CreateUserDto): Promise<Partial<User>>{
    const { fullname, email, password, username, visibility, visibilitylist } = createUserDto;

    const User = new this.userModel(createUserDto);
    User.fullname = fullname,
    User.email = email,
    User.salt = await bcrypt.genSalt()
    User.password = await this.hashPassword(password, User.salt);
    User.username = username,
    User.visibility = visibility,
    User.visibilitylist = visibilitylist

    

    await User.save().catch(err =>{
      throw new ConflictException({
        ...err,
        reason:`${(err.code === 11000 && "Duplicate") || "Mongo Input Error"}`
      })
    });
    
    const newUser: Partial<User> = {
      fullname: User.fullname,
      email: User.email,
      username:User.username,
      visibility:User.visibility,
      visibilitylist: User.visibilitylist
    }

    return newUser;
  }


  async signIn(signInDto: SignInDto) : Promise<ISignInResponse>{

    const { email, password } = signInDto;
    const user = await this.userModel.findOne({email})
  
    //await !important
    if(user && await this.validatePassword(password, user)){
      const payload: IJwtPayload = {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        visibility: user.visibility,
        visibilitylist: user.visibilitylist
      }

      const accessToken =  this.jwtService.sign(payload);


      return {
        ...payload,
        accessToken
      }
    }
    else{
      throw new NotFoundException({
        message: "User Not Found"
      })
    }
  }
  
}
