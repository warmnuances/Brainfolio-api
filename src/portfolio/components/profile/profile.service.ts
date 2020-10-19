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


    async getFileNameAndLink(fileNames, username, _id) {

        var fileNameAndLink = [];
        var bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(let fileName of fileNames){
            var fileNamePath = username + '/' + _id + '/'+ fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }

        return fileNameAndLink;
    }

    //Upload file to firebase Function and delete file on local
    async uploadFile(fileNames, username, _id) {
        var bucket = admin.storage().bucket();

        for(let fileName of fileNames){
            var filePath = './files/'+fileName

            // Uploads a local file to the bucket
            await bucket.upload(filePath, {
                destination: username + '/profile/' + _id + '/' +fileName,
            });

            try {
                await fs.unlinkSync(filePath)
            } catch(err) {
                console.error(err)  
            }
        }
    }

    async deleteFile(username, _id,  fileName) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/projects/' + _id + '/' + fileName;
        await bucket.file(fileNamePath)
            .delete()
            .catch(err => console.error(err));


    }
    
    async saveProject(profileImage: FileDto, backgroundImage: FileDto , profile:ProfileDto, username): Promise<Profile> {

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
        projectModel = await this.profileModel.findByIdAndUpdate(_id, profile, {new: true});

        
        var currentFile = projectModel.projectFileName;

        // Grabing fileNames
        var fileToUpload = [];
        fileToUpload.push(profileImage.filename);
        fileToUpload.push(backgroundImage.filename);

        //Upload files to firebase
        await this.uploadFile(fileToUpload, username, _id).catch(console.error);
        console.log('cuurenet = ', currentFile);
        console.log('upload =', fileToUpload);
        
        
        updateFileName["projectFileName"] = currentFile.concat(fileToUpload);        
        projectModel = await this.profileModel.findByIdAndUpdate(_id, updateFileName, {new: true});
        updateFileName = projectModel.projectFileName;
        //Get link
        projectModel.projectFileName = await this.getFileNameAndLink(updateFileName, username, _id);

        return projectModel;
    } 

}
