import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skills } from './schemas/skills.schema';
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skills.name) private readonly skillsModel: Model<Skills>) {}

    async create(skills: SkillsDto): Promise<Skills> {
        const newskills = new this.skillsModel(skills);
        return newskills.save();
      } 
    async findAll(username:string): Promise<Skills[]> {
        return this.skillsModel.find({username : username}).exec();
    }

    async findOne(id: string): Promise<Skills> {
        return await this.skillsModel.findOne({_id: id})

    }
    async delete(id: string): Promise<Skills> {
        return await this.skillsModel.findByIdAndRemove(id) 
    }

    async update(id: string, skills: SkillsDto): Promise<Skills> {
        return await this.skillsModel.findByIdAndUpdate(id, skills, {new: true})
    }
}
