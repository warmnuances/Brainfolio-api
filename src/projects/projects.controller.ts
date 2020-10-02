import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'
import {FileFieldsInterceptor, FilesInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';
import {FileDto} from './dto/project-file.dto'


import * as admin from 'firebase-admin';
import { from } from 'rxjs';

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

    // @Post()
    // create(@Body(ValidationPipe) createProjectDto: ProjectDto): Promise<Project> {
    //     return this.projectsService.create(createProjectDto);
    // }
    
    @Post()
    @UseInterceptors(FilesInterceptor('files',3,
      {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }
    ))
    Create(@UploadedFiles() files:[FileDto], @Body(ValidationPipe) createProjectDto: ProjectDto): Promise<Project> {      
      return this.projectsService.createFiles(files,createProjectDto)
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
