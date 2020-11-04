import { BadRequestException, Body, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CheckUsernameDto } from './dto/check-username-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { IFirebasePayload } from './interface/firebase-payload.interface';
import { Userv2 } from '../schema/userv2.schema';
import { Profilev2 } from '../schema/profilev2.schema';
import { DarkModeDto } from './dto/dark-mode-dto';
import * as admin from 'firebase-admin';
import {format} from "util";


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
        user.save();
        console.log(profile);
      }
      
      return user;
    }
    catch(e){
      throw new InternalServerErrorException("(GetUserFromDatabase) Failed to create user:" + e)
    }
  }

  async checkUniqueUsername(body :CheckUsernameDto){
    const { username } = body;
    const result = await this.userModel.findOne({username: username});
  
    return {
      isUnique: result? false : true
    }
  }

  async setUsername(signUpDto: SignUpDto, payload:IFirebasePayload){
    const { uid } = payload;
    const { username } = signUpDto;
    

    const result = await this.userModel.findOne({uid: uid})
    if(!result) throw new NotFoundException("User Not Found");

    if(!result.username){

      const exists = await this.userModel.findOne({username: username});
      if(!exists){
        result.username = username;
        result.markModified("username")
        result.isCompleted = true;
        result.markModified("isCompleted")
      }else{
        throw new ConflictException("Username exists!")
      }

      result.save()

    }else{
      throw new ConflictException("Username already being set!")
    }

    return {username: result.username};
    
  }

  async setDarkMode( mode: DarkModeDto, payload:IFirebasePayload){
    const { uid } = payload;
    const { isDarkMode } = mode;
    
    const result = await this.userModel.findOne({uid: uid})

    if(result){
      result.darkMode = isDarkMode;
      result.markModified("darkMode")

      result.save()
    }else{
      throw new NotFoundException("User does not exists!")
    }
    return {darkMode: result.darkMode};
  }

  async uploadImages(files: any, payload:IFirebasePayload){

    const { uid } = payload;
    const user = await this.userModel.findOne({uid: uid});
    
    if(!user) throw new NotFoundException("User not found!");


    if(files.avatar){
      const avatar =  files.avatar[0]
      const filePath = await this.uploadUserImage(avatar,user);
      user.profile.profileImage = filePath;
      user.markModified("profile");
    }

    if(files.background){
      const background = files.background[0]
      const filePath = await this.uploadUserImage(background,user);
      user.profile.backgroundImage = filePath;
      user.markModified("profile");
    }
    user.save();
  }

 

  //Takes in a single file and upload and returns filepath in firebase
  private async uploadUserImage(file:any, user:Userv2):Promise<string>{
    const { _id,username } = user;
    const key = file.fieldname;
    const extension = file.originalname.split('.').pop();
    const filePath = `${username}/profile/${_id}/${key}.${extension}`
    const fileUpload =  admin.storage().bucket().file(filePath);
   

    const fileStream = fileUpload.createWriteStream({
      metadata: {
      contentType: file.mimetype
      }
    })
    fileStream.on('error', function(err) {
        console.log(err);
        throw new InternalServerErrorException(err, "Failed to upload file")
    })
    fileStream.on('finish', function() {
        console.log('File Uploaded Succesfully');
    });
    fileStream.end(file.buffer);

    return filePath;
  }


   // Get the image path from firebase and generate an image Url
   private async getImagePublicUrl(imageUrl:string){
    const config = {
      action: "read" as const,
      expires: Date.now() + 1000 * 60 * 5, // 5 minutes
    };
    // const pubUrl = await fileUpload.getSignedUrl(config)
  }
}
