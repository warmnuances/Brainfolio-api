import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './interfaces/profile.interface'
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectModel('Profile') private readonly profileModel: Model<Profile>) {}

    async create(profile: ProfileDto): Promise<Profile> {
        const newprofile = new this.profileModel(profile);
        return newprofile.save();
      } 
    async findAll(portfolioId: string): Promise<Profile[]> {
        return this.profileModel.find({portfolioId : portfolioId}).exec();
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
}
