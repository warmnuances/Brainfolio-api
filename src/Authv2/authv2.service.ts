import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckUsernameDto } from './dto/check-username-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { IFirebasePayload } from './interface/firebase-payload.interface';
import { Userv2 } from '../schema/userv2.schema';
import { Profilev2 } from '../schema/profilev2.schema';

import { from } from 'rxjs';


@Injectable()
export class AuthV2Service {
  constructor(
    @InjectModel(Userv2.name) private userModel: Model<Userv2>,
    @InjectModel(Profilev2.name) private profileModel: Model<Profilev2>,
  ){}
  
  /** Create a user from token if not exists
   *  @param {IFirebasePayload}
   * **/
  async getUserFromDatabase(payload: IFirebasePayload): Promise<Userv2>{
    const { uid, email } = payload;
    try{
      let user = await this.userModel.findOne({uid: uid});
      
      if(!user){
        user = new this.userModel();

        user.uid = uid;
        user.email = email;
        user.isCompleted = false;
      
        const profile = new this.profileModel();
        profile.isPublic = true;
        profile.displayEmail = email;


        user.profile = profile;
        await user.save();

      }
      
      return user;
    }
    catch(e){
      throw new InternalServerErrorException("(GetUserFromDatabase) Failed to create user:" + e)
    }
  }

  async checkUniqueUsername(body :CheckUsernameDto){
    const { username } = body;

    try{
      const result = await this.userModel.findOne({username: username});
    
      return {
        isUnique: result? false : true
      }

    }catch(err){
      throw new InternalServerErrorException("Error with Database: ", err)
    } 
  }

  async setUsername(signUpDto: SignUpDto, payload:IFirebasePayload){
    const { uid } = payload;
    const { username } = signUpDto;
    

    const result = await this.userModel.findOne({uid: uid})
    

    if(!result.username){

      result.username = username;
      result.markModified("username")
      result.isCompleted = true;
      result.markModified("isCompleted")


      await result.save()

    }else{
      throw new ConflictException("Username exists!")
    }

    return result.username;
    
  }

}
