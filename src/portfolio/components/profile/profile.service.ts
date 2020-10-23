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
    async findAll(username:string): Promise<Profile[]> {
        return this.profileModel.find({username : username}).exec();
    }

    async findOne(id: string): Promise<Profile> {
        return await this.profileModel.findOne({_id: id})

    }
    async delete(id: string): Promise<Profile> {
        return await this.profileModel.findByIdAndRemove(id) 
    }

    async update(id: string, profile:ProfileDto): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(id, profile, {new: true})
    }


    async getFileNameAndLink(fileNames, username, _id, type:string) {

        var fileNameAndLink = [];
        var bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(let fileName of fileNames){
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

    async deleteFile(username, _id,  fileName) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/projects/' + _id + '/' + fileName;
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
            await newProject.save();   
            _id = newProject._id;
    
        }

        //Update database with new projectObject       
        delete profile['_id']
        delete profile['projectFileName']
        delete profile['__v']
        var projectModel;
        // Grabing fileNames

        
        if(image.profileImage != undefined){

            
            var profileImageName = image.profileImage[0];
            
            await this.uploadFile(profileImageName, username, _id, "profileImage").catch(console.error); 
            
            profile["profileImageName"] = [profileImageName.originalname];
        }
        if(image.backgroundImage != undefined){
            var backgroundImageName = image.backgroundImage[0];
            await this.uploadFile(backgroundImageName, username, _id, "backgroundImage").catch(console.error);
            profile["backgroundImageName"]= [backgroundImageName.originalname];  
        }
       

        projectModel = await this.profileModel.findByIdAndUpdate(_id, profile, {new: true});
        
        
        //Get link
        projectModel.profileImageName = await this.getFileNameAndLink(projectModel.profileImageName, username, _id, "profileImage");
        projectModel.backgroundImageName = await this.getFileNameAndLink(projectModel.backgroundImageName, username, _id, "backgroundImage");

        

        return projectModel;
    } 

}
