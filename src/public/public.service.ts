import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class PublicService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        @InjectModel('Skills') private readonly skillsModel: Model<Skills>,
        @InjectModel('Experience') private readonly experienceModel: Model<Experience>,
        @InjectModel('Education') private readonly educationModel: Model<Education>,
        @InjectModel('Profile') private readonly profileModel: Model<Profile>
    ) {}



    async getFileNameAndLink(fileNames, username, _id) {

        const fileNameAndLink = [];
        const bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(const fileName of fileNames){
            const fileNamePath = username + '/projects/' + _id + '/'+ fileName;
            const file = bucket.file(fileNamePath);
            const url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }

        return fileNameAndLink;
    }


    async findAllProject(username:string): Promise<Project[]> {
        try{
            const result = await this.projectModel.find({username:username, isPublic:true}).exec();
            if(!result){
                console.log(result)
                throw new NotFoundException("(FindAllProject): Resource not found");
            }
            return result;
        }
        catch(e){
            throw new InternalServerErrorException("(FindAllProject): Mongo Error")
        }
    }

    async findProject(username:string, id:string): Promise<Project> {
        const projectModel = await this.projectModel.findOne({username:username, isPublic:true, _id:id}).exec();
        const fileNames = projectModel.projectFileName;
        const _id = projectModel._id;
        

        // Grab filename and Link to access
        projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, _id);
        return projectModel;
    }
    async findSkills(username:string): Promise<Skills[]> {
        return await this.skillsModel.find({username : username}).exec();
    }
    async findProfile(username:string): Promise<Profile> {
        const result = await this.profileModel.findOne({username : username}).exec();
        if(!result){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return result

    }
    async findExperience(username:string): Promise<Experience[]> {
        const result = await this.experienceModel.find({username:username}).exec();
        if(!result){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return result
    }
    async findEducation(username:string): Promise<Education[]> {

        const result = await this.educationModel.find({username:username}).exec();
        if(!result){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return result
    }

    async portfolioIsPublic(username:string) {
        const model = await this.profileModel.findOne({username : username}).exec();
        return model.isPublic;
    }




}