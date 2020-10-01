import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'
import {FileFieldsInterceptor} from '@nestjs/platform-express'

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
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]))


    uploadFile(@UploadedFiles() files, @Body() theRest: String) {

        var bucket = admin.storage().bucket();

        console.log(bucket);
         
        async function uploadFile() {
            // Uploads a local file to the bucket
            await bucket.upload(files, {
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
        
            // console.log(`${filename} uploaded to ${bucketName}.`);
        }

        uploadFile();
        console.log(theRest);

        
        console.log(files);
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
