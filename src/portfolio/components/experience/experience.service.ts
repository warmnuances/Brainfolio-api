import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './schemas/experience.schema';
import { ExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel(Experience.name) private experienceModel: Model<Experience>) {}

    async create(experience: ExperienceDto): Promise<Experience> {
        const newExperience = new this.experienceModel();

        for(const [key,value] of Object.entries(experience)){
            if(value){
                newExperience[key] = value;
            }
        }

        console.log("NewExperience", newExperience);

        newExperience.save(err => {
            if(err) {
                console.log(err)
            }
        });

        return newExperience;
    } 
    async findAll(username:string): Promise<Experience[]> {
        return this.experienceModel.find({username:username}).exec();
    }

    async findOne(id: string): Promise<Experience> {
        return await this.experienceModel.findOne({_id: id})

    }
    async delete(id: string): Promise<Experience> {
        return await this.experienceModel.findByIdAndRemove(id) 
    }

    async update(id: string, experience:ExperienceDto): Promise<Experience> {
        return await this.experienceModel.findByIdAndUpdate(id, experience, {new: true})
    }
}
