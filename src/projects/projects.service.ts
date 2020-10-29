import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface'
import { ProjectDto } from './dto/create-project.dto';
import { FileDto } from './dto/project-file.dto';

import * as admin from 'firebase-admin';

@Injectable()
export class ProjectsService {

    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}

    // --- Finding all projects ---
    async findAll(username:string): Promise<Project[]> {
        try{
            return this.projectModel.find({username:username}).exec();
        }catch(e){
            throw new HttpException('MongoError', HttpStatus.CONFLICT)
        }
        
    }

    // --- Find One Project ---
    async findOne(_id: string, username:string ): Promise<Project> {
        try{
            //Grabing model data    
            let projectModel = await this.projectModel.findOne({_id: _id});
            let fileNames = projectModel.projectFileName;
            
            // Grab filename and Link to access
            projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, _id);
            return projectModel;            
        }catch(e){
            throw new HttpException('Unable to fetch data', HttpStatus.CONFLICT)
        }
        

    }

    // --- Delete Project ---
    async deleteProject(username: string, _id: string): Promise<Project> {
        try{
            // Delete old file
            var oldModel = await this.projectModel.findOne({ _id: _id});
            var oldDataName = oldModel.projectFileName;

            
            for(let fileName of oldDataName){
                await this.deleteFile(username, _id, fileName).catch(console.error);
            }

            //Delete Mongo
            return await this.projectModel.findByIdAndRemove(_id)
        }catch(e){
            throw new HttpException('Unable delete files', HttpStatus.CONFLICT)
        }

    }

    // --- Save Project
    async saveProject(fileToUploadArray, projectDTO:ProjectDto, username): Promise<Project> {

        try{
            let projectModel;

            let _id = projectDTO._id;
            //if(_id === '' || _id == undefined || _id == null){
            if(!_id){
                projectModel = new this.projectModel();  
                _id = projectModel._id;
            }else{
                projectModel = await this.projectModel.findById(_id);
            }
            
            //Parsing Datas
            if(projectDTO.startDate){
                projectModel.startDate = new Date(projectDTO.startDate)           
            }
            if(projectDTO.endDate){
                projectModel.endDate = new Date(projectDTO.endDate)
            }
            if(projectDTO.onGoing){
                projectModel.onGoing = Boolean(projectDTO.onGoing)
            }
            if(projectDTO.isPublic){
                projectModel.isPublic = Boolean(projectDTO.isPublic)
            }
            if(projectDTO.contributor){
                if(!Array.isArray(projectDTO.contributor)){
                    projectDTO.contributor = [projectDTO.contributor]
                }
                let contributorArray = []
                for(let contributor of projectDTO.contributor){
                    contributorArray.push(JSON.parse(contributor))
                }          
                projectModel.contributor = contributorArray;     
            }
    
            projectModel.username= username;
            projectModel.title= projectDTO.title;
            projectModel.description = projectDTO.description;
            projectModel.youtubeLink = projectDTO.youtubeLink;
            
            //Files        
            let currentFile = projectModel.projectFileName;
            let filesToDelete = projectDTO.filesToDelete;
            
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
            projectModel.projectFileName = currentFile.concat(filenameToUpload);
            
            //Saving the files
            await projectModel.save()
            
            //Grabbing project File Links
            let updateFileName = projectModel.projectFileName;
            projectModel.projectFileName = await this.getFileNameAndLink(updateFileName, username, _id);
            
            return projectModel;
        }catch(e){
            throw new HttpException('Unable to save files', HttpStatus.CONFLICT)
        }

    } 

    
    // Will take filename and return the link to access the file
    async getFileNameAndLink(fileNames, username, _id) {

        let fileNameAndLink = [];
        let bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
        let nameAndLink;
        for(let fileName of fileNames){
            nameAndLink={}
            let fileNamePath = username + '/projects/' + _id + '/'+ fileName;
            let file = bucket.file(fileNamePath);
            let url = await file.getSignedUrl(config) 
            nameAndLink['name']=fileName
            nameAndLink['link']=url[0]
            fileNameAndLink.push(nameAndLink);
            // url.unshift(fileName)
            // fileNameAndLink.push(url);
        }
        return fileNameAndLink;
    }

    // --- Helper function ---

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

    //Deleting files on the firebase
    async deleteFile(username, _id,  fileName) {
        var bucket = admin.storage().bucket();

        var fileNamePath = username + '/projects/' + _id + '/' + fileName;
        await bucket.file(fileNamePath)
            .delete()
            .catch(err => console.error(err));
    }
    

    





}
