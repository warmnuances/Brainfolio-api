import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Custom } from './schemas/custom.schema';
import { CustomDto } from './dto/custom.dto';
import { CustomTitleDto } from './dto/custom.title.dto';
import { CustomTitle } from './schemas/custom.title.schema';

@Injectable()
export class CustomService {
    constructor(
        @InjectModel('Custom') private readonly customModel: Model<Custom>, 
        @InjectModel('CustomTitle') private readonly customTitleModel: Model<CustomTitle>, 
        ) {}

    async create(custom: CustomDto): Promise<Custom> {
        const newcustom = new this.customModel(custom);
        return newcustom.save();
    } 
    async createTitle(customTitle: CustomTitleDto, username: string): Promise<CustomTitle> {
        const newcustomtitle = new this.customTitleModel(customTitle);
        const type = newcustomtitle["type"]
        const existingcustomtitle = await this.customTitleModel.find({username:username, type:type});
        if(existingcustomtitle.length == 0){
              return newcustomtitle.save();
        }
        else{
            this.deleteTitle(existingcustomtitle[0]._id);
            return newcustomtitle.save();
        }
      
    } 

    async findAll(username:string): Promise<Custom[]> {
        return this.customModel.find({username:username}).exec();
    }

    async findOne(id: string): Promise<Custom> {
           return await this.customModel.findOne({_id: id})
    }
    async findOneTitle(username:string,type:string): Promise<CustomTitle> {
        return await this.customTitleModel.findOne({username: username, type: type})
    }
    async delete(id: string): Promise<Custom> {
        return await this.customModel.findByIdAndRemove(id) 
    }
    async deleteTitle(id: string): Promise<CustomTitle> {
        return await this.customTitleModel.findByIdAndRemove(id) 
    }

    async update(id: string, custom:Custom): Promise<Custom> {
        return await this.customModel.findByIdAndUpdate(id, custom, {new: true})
    }
    async updateTitle(id: string, customTitle:CustomTitle): Promise<CustomTitle> {
        return await this.customTitleModel.findByIdAndUpdate(id, customTitle, {new: true})
    }

    
}
