import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';

@Injectable()
export class PublicService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        @InjectModel('Skills') private readonly skillsModel: Model<Skills>,
        @InjectModel('Experience') private readonly experienceModel: Model<Experience>,
        @InjectModel('Education') private readonly educationModel: Model<Education>,
        @InjectModel('Profile') private readonly profileModel: Model<Profile>
    ) {}

    async findProject(username:string): Promise<Project[]> {
        return await this.projectModel.find({username:username, isPublic:true}).exec();
    }
    async findSkills(username:string): Promise<Skills[]> {
        return await this.skillsModel.find({username : username}).exec();
    }
    async findProfile(username:string): Promise<Profile> {
        return await this.profileModel.findOne({username : username}).exec();
    }
    async findExperience(username:string): Promise<Experience[]> {
        return await this.experienceModel.find({username:username}).exec();
    }
    async findEducation(username:string): Promise<Education[]> {
        return await this.educationModel.find({username:username}).exec();
    }

    async portfolioIsPublic(username:string) {
        const model = await this.profileModel.findOne({username : username}).exec();
        return model.isPublic;
    }


}