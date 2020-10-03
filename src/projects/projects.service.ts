import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface'
import { ProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectsService {

    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}


    async create(project: ProjectDto): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
      } 
    
    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }


    async findOne(id: string): Promise<Project> {
        return await this.projectModel.findOne({_id: id})
        
    }

    async delete(id: string): Promise<Project> {
        return await this.projectModel.findByIdAndRemove(id)
        
    }

    async update(id: string, project:ProjectDto): Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, project, {new: true})
        
    }




}
