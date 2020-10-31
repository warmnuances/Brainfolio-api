import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './interfaces/profile.interface'
import { ProfileDto } from './dto/profile.dto';
import { FileDto } from './dto/profile-file.dto';

import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class ProfileService {
    constructor(@InjectModel('Profile') private readonly profileModel: Model<Profile>) {}

    async create(profile: ProfileDto): Promise<Profile> {
        const newprofile = new this.profileModel(profile);
        return newprofile.save();
      } 
    // async findAll(username:string): Promise<Profile[]> {
    //     return this.profileModel.find({username : username}).exec();
    // }

    async findOne(username: string): Promise<Profile> {
        const profileModel = await this.profileModel.findOne({username: username});

        
        if(profileModel != null){           
            const _id = profileModel._id;

            //Get link'
            let profileArray = []
            profileArray = profileModel.profileImageName;
            if(profileArray.length != 0){
                profileModel.profileImageName = await this.getFileNameAndLink(profileArray, username, _id, "profileImage");
            }
    
            let backgroundArray = []
            backgroundArray = profileModel.backgroundImageName;
            if(backgroundArray.length != 0){
                profileModel.backgroundImageName = await this.getFileNameAndLink(backgroundArray, username, _id, "backgroundImage");
            }
        }
        
        
        



        return profileModel;

    }
    async delete(id: string): Promise<Profile> {
        return await this.profileModel.findByIdAndRemove(id) 
    }

    async update(id: string, profile:ProfileDto): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(id, profile, {new: true})
    }


    async getFileNameAndLink(fileNames, username, _id, type:string) {

        const fileNameAndLink = [];
        const bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(const fileName of fileNames){
            var fileNamePath = username  + '/profile/' + _id + '/' + type + '/' + fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }
        
        return fileNameAndLink[0];
    }

    //Upload file to firebase Function and delete file on local
    async uploadFile(fileToUploadArray, username, _id, type:string) {
        // var bucket = admin.storage().bucket().file(username + '/projects/' + _id + '/' +fileName);

        let fileToUpload = fileToUploadArray
        // for(let fileToUpload of fileToUploadArray){

            const fileName = fileToUpload.originalname;

            const file = await admin.storage().bucket().file(username + '/profile/' + _id + '/' + type + '/' + fileName);


            const fileStream = file.createWriteStream({
              metadata: {
                contentType: fileToUpload.mimetype
              },
              resumable: true
            })

            fileStream.on('error', function(err) {})

            fileStream.on('finish', function() {
            });

            fileStream.end(fileToUpload.buffer);

        // }


    }

    async deleteFile(username, _id,  fileName, type) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/profile/' + _id + '/' + type + '/' + fileName;

        
        await bucket.file(fileNamePath)
            .delete()
            .catch(err => console.error(err));
            
    }
    
    
    async saveProject(image, profile:ProfileDto, username): Promise<Profile> {
        
        var _id = profile._id;
        var updateFileName = {}    
        
        //!!!!!!!!!! null or undefied or ''
        if(_id === '' || _id === undefined){
            const newProject = await new this.profileModel({username: username});
            const existingProfile = await this.profileModel.find({username:username});
            if(existingProfile.length == 0){
                await newProject.save();
                _id = newProject._id;
            }
            else{
                await this.delete(existingProfile[0]._id);
                await newProject.save();
                _id = newProject._id;
            }
        }

        //Update database with new projectObject       
        delete profile['_id']
        delete profile['profileImageName']
        delete profile['backgroundImageName']
        delete profile['__v']
        var profileModel;
        

        profileModel = await this.profileModel.findByIdAndUpdate(_id, profile, {new: true});

        var profileToDelete = profile.profileToDelete;
        var backgroundToDelete = profile.backgroundToDelete;

        //Delete file if any
        if(profileToDelete != '' ){            
            //Delete on Firebase
            await this.deleteFile(username, _id, profileToDelete, "profileImage")
            profileModel.profileImageName = []
            
        }
        if(backgroundToDelete != '' ){
            //Delete on Firebase
            await this.deleteFile(username, _id, backgroundToDelete, "backgroundImage") 
            profileModel.backgroundImageName = []
        }       

        //Updating ProfileImage
        if(image.profileImage != undefined){

            //Delete existing file
            let existingProfileImage = profileModel.profileImageName[0]
            if(existingProfileImage){
                await this.deleteFile(username, _id, existingProfileImage, "profileImage") 
            }

            //Upload File
            let profileImageName = image.profileImage[0];
            await this.uploadFile(profileImageName, username, _id, "profileImage").catch(console.error); 
            profileModel["profileImageName"] = [profileImageName.originalname];
        }

        //Update BackgroundImage
        if(image.backgroundImage != undefined){

            //Delete existing file
            let existingBackgroundImage = profileModel.backgroundImageName[0]
            if(existingBackgroundImage){
                await this.deleteFile(username, _id, existingBackgroundImage, "backgroundImage") 
            }

            //Upload new Image
            let backgroundImageName = image.backgroundImage[0];
            await this.uploadFile(backgroundImageName, username, _id, "backgroundImage").catch(console.error);
            profileModel["backgroundImageName"]= [backgroundImageName.originalname];  
        }
    
        profileModel = await this.profileModel.findByIdAndUpdate(_id, profileModel, {new: true});
        
        //Get link'
        let profileArray = profileModel.profileImageName;
        if(profileArray.length != 0){
            profileModel.profileImageName = await this.getFileNameAndLink(profileArray, username, _id, "profileImage");
        }

        let backgroundArray = profileModel.backgroundImageName;
        if(backgroundArray.length != 0){
            profileModel.backgroundImageName = await this.getFileNameAndLink(backgroundArray, username, _id, "backgroundImage");
        }

        
        return profileModel;
    } 

}
