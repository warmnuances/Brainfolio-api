import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Education } from './interfaces/education.interface'
import { EducationDto } from './dto/education.dto';

@Injectable()
export class EducationService {
    constructor(@InjectModel('Education') private readonly educationModel: Model<Education>) {}

    async create(education: EducationDto): Promise<Education> {
        const neweducation = new this.educationModel(education);
        return neweducation.save();
      } 
    async findAll(username:string): Promise<Education[]> {
        return this.educationModel.find({username:username}).exec();
    }

    async findOne(id: string): Promise<Education> {
        return await this.educationModel.findOne({_id: id})

    }
    async delete(id: string): Promise<Education> {
        return await this.educationModel.findByIdAndRemove(id) 
    }

    async update(id: string, education:EducationDto): Promise<Education> {
        return await this.educationModel.findByIdAndUpdate(id, education, {new: true})
    }
}
