import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../Auth/get-user.decorator';
import { User } from '../Auth/user.schema';


@Controller('projects')
// @UseGuards(AuthGuard())
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(): Promise<Project[]> {
      return this.projectsService.findAll('username');
    } 

    // Get a single project
    @Get(':id')
    findOne( @Param() param):Promise<Project> { 
      var result = this.projectsService.findOne(param.id,'username');
      return result
    }
    
    //Delete all project
    @Delete('project')
    deleteProject( @Body(ValidationPipe) deletionData:DeleteFilesDto): Promise<Project> {
      var _id = deletionData._id;
      return this.projectsService.deleteProject('username', _id);
    }

    //Save project files only
    @Post('save')
    @UseInterceptors(FilesInterceptor('filesToUpload',3,
      {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }
    ))
    saveProject( @UploadedFiles() files:[FileDto], @Body(ValidationPipe) project: ProjectDto): Promise<Project> {  
      
      console.log('PROJECT BODY = ', project);
      return this.projectsService.saveProject(files, project, 'username')
    }
}
