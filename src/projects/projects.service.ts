import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface'
import { ProjectDto } from './dto/create-project.dto';
import { FileDto } from './dto/project-file.dto';



import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class ProjectsService {

    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}


    // Will take filename and return the link to access the file
    async getFileNameAndLink(fileNames, username, projectId) {

        var fileNameAndLink = [];
        var bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(let fileName of fileNames){
            var fileNamePath = username + '/' + projectId + '/'+ fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }

        return fileNameAndLink;
    }

    //Upload file to firebase Function and delete file on local
    async uploadFile(fileNames, username, projectId) {
        var bucket = admin.storage().bucket();

        for(let fileName of fileNames){
            var filePath = './files/'+fileName

            // Uploads a local file to the bucket
            await bucket.upload(filePath, {
                destination: username + '/' + projectId + '/' +fileName,
            });

            try {
                await fs.unlinkSync(filePath)
            } catch(err) {
                console.error(err)  
            }
        }


    }

    async deleteFile(username, projectId,  fileNamesArray) {
        var bucket = admin.storage().bucket();

        for(let fileName of fileNamesArray){
            var fileNamePath = username + '/' + projectId + '/' + fileName;
            await bucket.file(fileNamePath).delete();
        }

    }
    

    async uploadFiles(files: [FileDto], projectId, username): Promise<Project> {
        
        var updateModel = {}  

        //!!!!!!!!!! null or undefied or ''
        
        if(projectId === '' || projectId === undefined){
            const newProject = await new this.projectModel({username: username});
            await newProject.save();   
            projectId = newProject.id;   
        }

        // Grabing fileNames
        var fileNames = [];
        for(let file of files){
            fileNames.push(file.filename)
        };

        //Upload files to firebase
        await this.uploadFile(fileNames, username, projectId).catch(console.error);

        //Update database with fileNames
        updateModel["projectFileName"] = fileNames;
        var projectModel = await this.projectModel.findByIdAndUpdate(projectId, updateModel, {new: true});
        
        //Get link
        projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, projectId);

        return projectModel;
    } 
    
    async findAll(username:string): Promise<Project[]> {
        return this.projectModel.find({username:username}).exec();
    }

    async findOne(projectId: string, username:string ): Promise<Project> {
        //Grabing model data
        var projectModel = await this.projectModel.findOne({_id: projectId});
        var fileNames = projectModel.projectFileName;
        
        // Grab filename and Link to access
        projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, projectId);

        return projectModel;
    }


    async deleteFiles(username:string, deletionData): Promise<Project> {
        
        const projectId = deletionData.projectId;
        const deleteFiles = deletionData.projectFileNames;
        var updateModel = {}

        var projectModel = await this.projectModel.findOne({_id: projectId});
        var oldFileNames = projectModel.projectFileName;

        var updateFileName = []
        oldFileNames.forEach(element => updateFileName.push(element));

        
        for(let deleteFile of deleteFiles){            
            updateFileName = updateFileName.filter(i => i !== deleteFile);
        }

        this.deleteFile(username, projectId, deleteFiles) 
      
        updateModel["projectFileName"] = updateFileName;
        
        // Delete files given
        var projectModel = await this.projectModel.findByIdAndUpdate(projectId, updateModel, {new: true});
        projectModel.projectFileName = await this.getFileNameAndLink(projectModel.projectFileName, username, projectId);

        return projectModel;

        
    }
    
    async deleteProject(username: string, projectId: string): Promise<Project> {

        // Delete old file
        var oldModel = await this.projectModel.findOne({ _id: projectId});
        var oldDataName = oldModel.projectFileName;
        
        await this.deleteFile(username, projectId, oldDataName).catch(console.error);

        return await this.projectModel.findByIdAndRemove(projectId)
        
    }

    async createUpdateProject(project:ProjectDto, username:string): Promise<Project> {

        var projectId = project.projectId;
        var projectModel;
        
        // undefined or null or ''
        if(projectId === '' || projectId === undefined){
            
            project['username'] = username;
            projectModel = await new this.projectModel(project);
            await projectModel.save();
        } else{
            projectModel = await this.projectModel.findByIdAndUpdate(projectId, project, {new: true})
        }    

        const fileNames = projectModel.projectFileName;

        projectModel.projectFileName = await this.getFileNameAndLink(fileNames, projectId, username);
        return projectModel;
        
    }
    

}
