import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from './interfaces/portfolio.interface'
import { PortfolioDto } from './dto/portfolio.dto';
import { Education } from './interfaces/education.interface'
import { EducationDto } from './dto/education.dto';
import { Experience } from './interfaces/experience.interface'
import { ExperienceDto } from './dto/experience.dto';
import { Profile } from './interfaces/profile.interface'
import { ProfileDto } from './dto/profile.dto';
import { Skills } from './interfaces/skills.interface'
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class PortfolioService {
    constructor(@InjectModel('Portfolio') private readonly portfolioModel: Model<Portfolio>) {}


    async create(portfolio: PortfolioDto): Promise<Portfolio> {
        const newportfolio = new this.portfolioModel(portfolio);
        return newportfolio.save();
      } 
    
    async findAll(): Promise<Portfolio[]> {
        return this.portfolioModel.find().exec();
    }


    async findOne(id: string): Promise<Portfolio> {
        return await this.portfolioModel.findOne({_id: id})
        
    }

    async delete(id: string): Promise<Portfolio> {
        return await this.portfolioModel.findByIdAndRemove(id)
        
    }

    async update(id: string, portfolio:PortfolioDto): Promise<Portfolio> {
        return await this.portfolioModel.findByIdAndUpdate(id, portfolio, {new: true})
    }
    
}
