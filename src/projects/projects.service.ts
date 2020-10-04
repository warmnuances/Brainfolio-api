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


    // async create(project: ProjectDto): Promise<Project> {
    //     const newProject = new this.projectModel(project);
    //     return newProject.save();
    // } 

    async createFiles(files: [FileDto], project: ProjectDto): Promise<Project> {
        
        var bucket = admin.storage().bucket();
        
        async function uploadFile(fileName) {
          var imgPath = './files/'+fileName
          // Uploads a local file to the bucket
          await bucket.upload(imgPath, {
            destination: 'username/'+fileName,
            // gzip: true,
            // metadata: {
            //   cacheControl: 'public, max-age=31536000',
            // },
          });
        //   console.log(`uploaded to brainfolio-1faf6`);
          
        }
        
        var projectFileName = [];

        for(let file of files){
            await uploadFile(file.filename).catch(console.error);
            projectFileName.push(file.filename);
            console.log('upload');
            
        }

        for (let filename of projectFileName){
            var path = './files/' + filename;
            try {
                await fs.unlinkSync(path)
                console.log('remove');
                //file removed
              } catch(err) {
                console.error(err)
              }
        }
        
        project["projectFileName"] = projectFileName;
        
        const newProject = new this.projectModel(project);
        return newProject.save();
    } 
    
    // async findAll(): Promise<Project[]> {
    //     return this.projectModel.find().exec();
    // }

    async findOne(id: string): Promise<Project> {

        var projectModel = await this.projectModel.findOne({_id: id});

        var fileNames = projectModel.projectFileName;

        var i = 0;

        async function getUrl(fileName) {
            var fileNamePath = 'username/' + fileName;
            var file = admin.storage().bucket().file(fileNamePath);
            const config = {
                action: "read" as const,
                expires: Date.now() + 1000 * 60 * 3, // 3 minutes
            };
            
            var x = file.getSignedUrl(config)
            var url = await x;

            projectModel.projectFileName[i] = url;
            projectModel.projectFileName[i].unshift(fileName)

            i+=1;                         
        
        }

        for (let fileName of fileNames){
            await getUrl(fileName);
        }

        return projectModel;
        
    }

    async delete(id: string): Promise<Project> {
        return await this.projectModel.findByIdAndRemove(id)
        
    }

    async update(files: [FileDto], id: string, project:ProjectDto): Promise<Project> {
        // console.log(project);
        

        if(files.length >= 1){
            var bucket = admin.storage().bucket();

            // Delete old file
            var oldModel = await this.projectModel.findOne({_id: id});
            var oldDataName = oldModel.projectFileName;

            async function deleteFile(fileName) {
                var fileNamePath = 'username/' + fileName;
                await bucket.file(fileNamePath).delete();
                console.log(`${fileName} deleted.`);
            }
            for(let file of oldDataName){
                await deleteFile(file).catch(console.error);
            }
              

            // Upload new file
            async function uploadFile(fileName) {
              var imgPath = './files/'+fileName
              await bucket.upload(imgPath, {
                destination: 'username/'+fileName,
              });   
            }
            
            var projectFileName = [];
    
            for(let file of files){
                await uploadFile(file.filename).catch(console.error);
                projectFileName.push(file.filename);
                console.log('upload');
            }
            
            // Delete file from local
            for (let filename of projectFileName){
                var path = './files/' + filename;
                try {
                    await fs.unlinkSync(path)
                    console.log('remove');
                    //file removed
                  } catch(err) {
                    console.error(err)
                  }
            }
            project["projectFileName"] = projectFileName;
            var projectModel = await this.projectModel.findByIdAndUpdate(id, project, {new: true})
        } else{

            // Updating without the file
            var projectModel = await this.projectModel.findByIdAndUpdate(id, project, {new: true})
        }

        return projectModel;
        
    }
    

}
