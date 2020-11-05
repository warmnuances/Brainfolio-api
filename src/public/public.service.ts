import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import * as admin from 'firebase-admin';
import { Userv2 } from '../schema/userv2.schema';
import { Visibility } from '../schema/visibility.schema';

@Injectable()
export class PublicService {

    constructor(
        @InjectModel(Userv2.name) private readonly usersModel: Model<Userv2>,
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        @InjectModel('Skills') private readonly skillsModel: Model<Skills>,
        @InjectModel('Experience') private readonly experienceModel: Model<Experience>,
        @InjectModel('Education') private readonly educationModel: Model<Education>,
        @InjectModel('Profile') private readonly profileModel: Model<Profile>,
        @InjectModel('Visibility') private readonly visibilityModel: Model<Visibility>
    ) {}

    async getFileNameAndLink(directory, fileNames) {

        const fileNameAndLink = [];
        const bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(const fileName of fileNames){
            const fileNamePath = directory + '/'+ fileName;
            const file = bucket.file(fileNamePath);
            const url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);

        }

        return fileNameAndLink;
    }



    async getImageLink(filepath) {

        const bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
        const file = bucket.file(filepath);
        const url = await file.getSignedUrl(config)
        return url[0];
    }



    async findProject(username:string, id:string): Promise<Project> {

        try{
            const projectModel = await this.projectModel.findOne({username:username, isPublic:true, _id:id}).exec();
            const fileNames = projectModel.projectFileName;
            const _id = projectModel._id;
        
        // Grab filename and Link to access
            const directory = username + '/projects/' + _id;
            projectModel.projectFileName = await this.getFileNameAndLink(directory, fileNames);
            return projectModel;
        }catch(e){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }

    // Client side will get the background and profile image.

    async findProfile(username:string, loggedUser:Userv2) {
        const user = await this.usersModel.findOne({username: username});
        if(!user){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }else{
            
            if(user.profile.isPublic || loggedUser.username == username){
                let temp = {}
                temp = {user: user}
                if(user.profile.profileImage != undefined && user.profile.profileImage != null){
                    temp["profileImageLink"] = await this.getImageLink(user.profile.profileImage);
                }
                if(user.profile.backgroundImage != undefined && user.profile.backgroundImage != null){
                    temp["backgroundImageLink"] = await this.getImageLink(user.profile.backgroundImage);
                }
                return temp;
            }else{
                // Throw not found instead of forbiddent to conceal if user exist
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }
        }
    }

    async findAllProject(username:string, token:string, user:Userv2): Promise<Project[]> {
        if(await this.verifyToken(username, token) || await this.portfolioIsPublic(username) || (user && username == user.username)){
            const result = await this.projectModel.find({username:username, isPublic:true}).exec();
            if(result){
                return result;
            }
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    async findSkills(username:string, token:string, user:Userv2): Promise<Skills[]> {
        if(await this.verifyToken(username, token) || await this.portfolioIsPublic(username) || (user && username == user.username)){
            const result = await this.skillsModel.find({username:username}).exec();
            if(result){
                return result
            }
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    async findExperience(username:string, token:string, user:Userv2): Promise<Experience[]> {
        if(await this.verifyToken(username, token) || await this.portfolioIsPublic(username) || (user && username == user.username)){
            console.log('masuk');
            
            const result = await this.experienceModel.find({username:username}).exec();
            if(result){
                return result
            }    
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    
    async findEducation(username:string, token:string, user:Userv2): Promise<Education[]> {
        
        if(await this.verifyToken(username, token) || await this.portfolioIsPublic(username) || (user && username == user.username)){

            const result = await this.educationModel.find({username:username}).exec();
            if(result){
                return result;
            }
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
   

    async portfolioIsPublic(username:string) {
        try{
            const model = await this.usersModel.findOne({username : username}).exec();
            if(model){
                return model.profile.isPublic;
            }else{                
                return false;
            }
        }catch(e){
            throw new HttpException('Invalid request', HttpStatus.NOT_FOUND)
        }

    }
    
    async verifyToken(username:string, token:string): Promise<boolean>{
        try{
            const visibilityModel = await this.visibilityModel.findOne({username:username, token:token}).exec();
            if(visibilityModel){
                return true;
            }else{
                return false;
            }

        }catch(e){
            throw new HttpException('Invalid request', HttpStatus.NOT_FOUND)
        }
    }




}