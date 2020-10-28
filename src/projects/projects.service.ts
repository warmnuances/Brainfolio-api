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
            var fileNamePath = username + '/projects/' + _id + '/'+ fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }
        return fileNameAndLink;
    }

    //Upload file to firebase Function and delete file on local
    async uploadFile(fileToUploadArray, username, _id) {
        // var bucket = admin.storage().bucket().file(username + '/projects/' + _id + '/' +fileName);

        let fileToUpload = fileToUploadArray
        const fileName = fileToUpload.originalname;
        const file = await admin.storage().bucket().file(username + '/projects/' + _id + '/' +fileName);
        const fileStream = file.createWriteStream({
            metadata: {
            contentType: fileToUpload.mimetype
            },
            resumable: true
        })
        fileStream.on('error', function(err) {
            console.log(err);
            
        })
        fileStream.on('finish', function() {
            console.log('uploaded');
            
        });
        fileStream.end(fileToUpload.buffer);
    }

    async deleteFile(username, _id,  fileName) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/projects/' + _id + '/' + fileName;
        await bucket.file(fileNamePath)
            .delete()
            .catch(err => console.error(err));
    }
    
    async saveProject(fileToUploadArray, project:ProjectDto, username): Promise<Project> {
        var _id = project._id;
        var updateFileName = {}    
        
        //!!!!!!!!!! null or undefied or ''
        //if(_id === '' || _id == undefined || _id == null){
        if(!_id){
            
            const newProject = await new this.projectModel({username: username});
            await newProject.save();   
            _id = newProject._id;
        }

        //Update database with new projectObject       
        delete project['_id']
        delete project['projectFileName']
        delete project['__v']
        var projectModel;
        
        //Parsing Datas
        if(project.startDate){
            project.startDate = new Date(project.startDate)           
        }else{
            delete project['startDate']   
        }
        if(project.endDate){
            project.endDate = new Date(project.endDate)
        }else{
            delete project['endDate'] 
        }
        if(project.onGoing){
            project.onGoing = Boolean(project.onGoing)
        }
        if(project.isPublic){
            project.isPublic = Boolean(project.isPublic)
        }
        if(project.contributor){
            if(!Array.isArray(project.contributor)){
                project.contributor = [project.contributor]
            }
            let contributorArray = []
            for(let contributor of project.contributor){
                contributorArray.push(contributor.split(','))
            }
            project["contributor"] = contributorArray;
            
        }

        
        projectModel = await this.projectModel.findByIdAndUpdate(_id, project, {new: true});

        
        let currentFile = projectModel.projectFileName;
        let filesToDelete = project.filesToDelete;
        
        
        //Delete on Firebase
        if(filesToDelete){
            if(!Array.isArray(filesToDelete)){
                filesToDelete = [filesToDelete];
            }

            //Delete on array
            for(let eachFile of filesToDelete){
                let i = 0;
                let fileLength = currentFile.length;
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
        var filenameToUpload = [];
        for(let file of fileToUploadArray){
            filenameToUpload.push(file.originalname)
        };

        //Upload files to firebase
        for(let fileToUpload of fileToUploadArray){
            console.log('try to upload: ', fileToUpload.originalname);
            
            await this.uploadFile(fileToUpload, username, _id).catch(console.error);
        }
        
        updateFileName["projectFileName"] = currentFile.concat(filenameToUpload);        
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

        
        for(let fileName of oldDataName){
            await this.deleteFile(username, _id, fileName).catch(console.error);
        }

        //Delete Mongo
        return await this.projectModel.findByIdAndRemove(_id)
    }
}
