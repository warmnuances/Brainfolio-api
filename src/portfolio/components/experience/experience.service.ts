import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './interfaces/experience.interface'
import { ExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel('Experience') private readonly experienceModel: Model<Experience>) {}

    async create(experience: ExperienceDto): Promise<Experience> {
        const newexperience = new this.experienceModel(experience);
        return newexperience.save();
      } 
    async findAll(portfolioId: string): Promise<Experience[]> {
        return this.experienceModel.find({portfolioId : portfolioId}).exec();
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
