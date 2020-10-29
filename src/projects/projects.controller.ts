import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'
import { FilesInterceptor} from '@nestjs/platform-express'
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../utils/file-uploading.utils';
import {FileDto} from './dto/project-file.dto'


import * as admin from 'firebase-admin';
import * as request from 'request';
import { DeleteFilesDto } from './dto/delete-file.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../Auth/get-user.decorator';
import { User } from '../Auth/user.schema';
import { Userv2 } from '../Authv2/userv2.schema';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('projects')
@UseGuards(AuthGuard())  
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(@GetUser() user:Userv2): Promise<Project[]> {
      const username = user.username;
      return this.projectsService.findAll(username);
    } 

    // Get a single project
    @Get('item/:id')
    findOne(@GetUser() user:Userv2, @Param() param):Promise<Project> {
      const username = user.username; 
      var result = this.projectsService.findOne(param.id,username);
      return result
    }
    
    //Delete all project
    @Delete(':id')
    deleteProject(@GetUser() user:Userv2, @Param() param): Promise<Project> {
      const username = user.username;
      return this.projectsService.deleteProject(username,param.id);
    }

    //Save project files only
    @Post('save')
    @UseInterceptors(FilesInterceptor('filesToUpload',3,
      {
        storage: memoryStorage(),
        fileFilter: imageFileFilter,
      }
    ))
    @ApiConsumes('multipart/form-data')
    saveProject(@GetUser() user:Userv2, @UploadedFiles() files, @Body(ValidationPipe) project: ProjectDto): Promise<Project> {

      const username = user.username; 
      return this.projectsService.saveProject(files, project, username)
    }
}
