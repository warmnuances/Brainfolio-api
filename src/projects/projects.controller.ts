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
@UseGuards(AuthGuard())
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(@GetUser() user: User): Promise<Project[]> {
      return this.projectsService.findAll(user.username);
    } 


    // Get a single project
    @Get(':id')
    findOne(@GetUser() user: User, @Param() param):Promise<Project> { 

      var result = this.projectsService.findOne(param.id,user.username);
      return result
    }
    
    // //Delete files only
    @Delete('files')
    deleteFiles(@GetUser() user: User, @Body(ValidationPipe) deletionData:DeleteFilesDto): Promise<Project>{      
      return this.projectsService.deleteFiles(user.username, deletionData);
    }

    //Delete all project
    @Delete('project')
    deleteProject(@GetUser() user: User, @Body(ValidationPipe) deletionData:DeleteFilesDto): Promise<Project> {
      var projectId = deletionData.projectId;
      return this.projectsService.deleteProject(user.username, projectId);
    }

    //Save project without files
    @Post('project')
    update(@GetUser() user: User, @Body(ValidationPipe) project: ProjectDto): Promise<Project> {
      return this.projectsService.createUpdateProject(project, user.username);
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
    Create(@GetUser() user: User, @UploadedFiles() files:[FileDto], @Body(ValidationPipe) projectDto: ProjectDto): Promise<Project> { 
      
      var projectId = projectDto.projectId;
      return this.projectsService.uploadFiles(files,projectId,user.username)
    }
}
