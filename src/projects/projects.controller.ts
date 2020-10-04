import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'
import {FileFieldsInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';


import * as admin from 'firebase-admin';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Project> {
        return this.projectsService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createProjectDto: ProjectDto): Promise<Project> {
        return this.projectsService.create(createProjectDto);
    }
    
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor(
            [
                { name: 'avatar', maxCount: 1 },
                { name: 'background', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                  destination: './files',
                  filename: editFileName,
                }),
                fileFilter: imageFileFilter,
              }
        )
        
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.background.forEach(file => {
          const fileReponse = {
            filename: file.filename,
          };
          response.push(fileReponse);
        });

        var bucket = admin.storage().bucket();

        async function uploadFile(fileName) {

            var imgPath = './files/'+fileName
            // Uploads a local file to the bucket
            await bucket.upload(imgPath, {
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              // By setting the option `destination`, you can change the name of the
              // object you are uploading to a bucket.
              metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
              },
            });
        
            console.log(` uploaded to brainfolio-1faf6`);
        }
         console.log(response[0].filename);
          
        uploadFile(response[0].filename).catch(console.error);

        console.log(response);
        
        return response;
    }
    @Get(':imgpath')
    uploadFile(@Param('imgpath') image, @UploadedFiles() files, @Body() theRest: String) {
        
        
        var bucket = admin.storage().bucket();

        var imgPath = './files/' + image

        console.log(imgPath);
        // console.log(bucket);
         
        async function uploadFile() {
            // Uploads a local file to the bucket
            await bucket.upload(imgPath, {
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              // By setting the option `destination`, you can change the name of the
              // object you are uploading to a bucket.
              metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
              },
            });
        
            console.log(` uploaded to brainfolio-1faf6`);
        }
          
        uploadFile().catch(console.error);
        // console.log(theRest);

        
        // console.log(files);
    }

    
    

    @Delete(':id')
    delete(@Param() param): Promise<Project> {
        return this.projectsService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateItemDto: ProjectDto, @Param() param): Promise<Project> {
        return this.projectsService.update(param.id,updateItemDto);
    }
}
