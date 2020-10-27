import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../portfolio/components/profile/schemas/profile.schema';
import { CheckUsernameDto } from './dto/check-username-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { IFirebasePayload } from './interface/firebase-payload.interface';
import { Userv2 } from './userv2.schema';




@Injectable()
export class AuthV2Service {
  constructor(
    @InjectModel(Userv2.name) private userModel: Model<Userv2>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
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
        user.save();
      }
      let profile = await this.profileModel.findOne({username: user.username})
      if(!profile){
        profile = new this.profileModel();
        profile.email = user.email;
        profile.fullName = user.fullname;
        profile.save();
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
      console.log(err)
      throw new InternalServerErrorException("Error with Database: ", err)
    } 
  }

  async setUsername(signUpDto: SignUpDto, payload:IFirebasePayload){
    const { uid } = payload;
    const { username } = signUpDto;
    

    try{
      const result = await this.userModel.findOne({uid: uid})
      

      if(!result.username){

        result.username = username;
        result.markModified("username")
        result.isCompleted = true;
        result.markModified("isCompleted")


        await result.save(err => {
          if(err){
            throw new InternalServerErrorException("Error in Database: ", err);
          }
        })

      }else{
        throw new ConflictException("Username exists!")
      }

        return result;
    }
    catch(err){
      throw new InternalServerErrorException("Error in Database: ", err);
    }
  }
}
