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
    async getFileNameAndLink(fileNames, username, _id) {

        var fileNameAndLink = [];
        var bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(let fileName of fileNames){
            var fileNamePath = username + '/' + _id + '/'+ fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }

        return fileNameAndLink;
    }

    //Upload file to firebase Function and delete file on local
    async uploadFile(fileNames, username, _id) {
        var bucket = admin.storage().bucket();

        for(let fileName of fileNames){
            var filePath = './files/'+fileName

            // Uploads a local file to the bucket
            await bucket.upload(filePath, {
                destination: username + '/projects/' + _id + '/' +fileName,
            });

            try {
                await fs.unlinkSync(filePath)
            } catch(err) {
                console.error(err)  
            }
        }


    }

    async deleteFile(username, _id,  fileName) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/projects/' + _id + '/' + fileName;
        await bucket.file(fileNamePath)
            .delete()
            .catch(err => console.error(err));


    }
    
    async saveProject(files: [FileDto], project:ProjectDto, username): Promise<Project> {

        var _id = project._id;
        var updateFileName = {}    
        
        //!!!!!!!!!! null or undefied or ''
        if(_id === '' || _id === undefined){
            const newProject = await new this.projectModel({username: username});
            await newProject.save();   
            _id = newProject._id;
    
        }

        //Update database with new projectObject       
        delete project['_id']
        delete project['projectFileName']
        delete project['__v']
        var projectModel;
        projectModel = await this.projectModel.findByIdAndUpdate(_id, project, {new: true});

        
        var currentFile = projectModel.projectFileName;
        var filesToDelete = project.filesToDelete;
        console.log('delete = ', filesToDelete);
        
        //Delete file if any
        if(filesToDelete != undefined ){
            //Delete on Firebase
            
            //Delete on array
            for(let eachFile of filesToDelete){
                var i = 0;
                var fileLength = currentFile.length;
                while(i < fileLength){
                    if(eachFile == currentFile[i]){
                        this.deleteFile(username, _id, eachFile)
                        currentFile.splice(i, 1)
                        continue;
                    }
                    i++;
                }
            }
        }
        
        // Grabing fileNames
        var fileToUpload = [];
        for(let file of files){
            fileToUpload.push(file.filename)
        };

        //Upload files to firebase
        await this.uploadFile(fileToUpload, username, _id).catch(console.error);
        console.log('cuurenet = ', currentFile);
        console.log('upload =', fileToUpload);
        
        
        updateFileName["projectFileName"] = currentFile.concat(fileToUpload);        
        projectModel = await this.projectModel.findByIdAndUpdate(_id, updateFileName, {new: true});
        updateFileName = projectModel.projectFileName;
        //Get link
        projectModel.projectFileName = await this.getFileNameAndLink(updateFileName, username, _id);

        return projectModel;
    } 
    
    async findAll(username:string): Promise<Project[]> {
        return this.projectModel.find({username:username}).exec();
    }

    async findOne(_id: string, username:string ): Promise<Project> {
        //Grabing model data
        var projectModel = await this.projectModel.findOne({_id: _id});
        var fileNames = projectModel.projectFileName;
        
        // Grab filename and Link to access
        projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, _id);
        return projectModel;
    }

    async deleteProject(username: string, _id: string): Promise<Project> {
        // Delete old file
        var oldModel = await this.projectModel.findOne({ _id: _id});
        var oldDataName = oldModel.projectFileName;
        await this.deleteFile(username, _id, oldDataName).catch(console.error);

        //Delete Mongo
        return await this.projectModel.findByIdAndRemove(_id)
    }
}
