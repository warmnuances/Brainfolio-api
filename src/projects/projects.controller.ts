import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'
import {FileFieldsInterceptor, FilesInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';
import {FileDto} from './dto/project-file.dto'


import * as admin from 'firebase-admin';
import * as request from 'request';
import { DeleteFilesDto } from './dto/delete-file.dto';


@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(): Promise<Project[]> {
      return this.projectsService.findAll('username');
    } 


    // Get a single project
    @Get(':id')
    findOne(@Param() param):Promise<Project> { 

      var result = this.projectsService.findOne(param.id,'username');
      return result
    }
    
    // //Delete files only
    @Delete('files')
    deleteFiles(@Body(ValidationPipe) deletionData:DeleteFilesDto): Promise<Project>{      
      return this.projectsService.deleteFiles('username', deletionData);
    }

    //Delete all project
    @Delete('project')
    deleteProject(@Body(ValidationPipe) deletionData:DeleteFilesDto): Promise<Project> {
      var projectId = deletionData.projectId;
      return this.projectsService.deleteProject('username', projectId);
    }

    //Save project without files
    @Post('project')
    update(@Body(ValidationPipe) project: ProjectDto): Promise<Project> {
      return this.projectsService.createUpdateProject(project, 'username');
    }

    //Save project files only
    @Post('files')
    @UseInterceptors(FilesInterceptor('files',3,
      {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }
    ))
    Create(@UploadedFiles() files:[FileDto], @Body(ValidationPipe) projectDto: ProjectDto): Promise<Project> { 
      
      var projectId = projectDto.projectId;
      return this.projectsService.uploadFiles(files,projectId,'username')
    }
}
