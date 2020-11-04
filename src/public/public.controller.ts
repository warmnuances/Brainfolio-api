import { Controller, Get, HttpException, HttpStatus, Param, Query, UseFilters, UseGuards } from '@nestjs/common';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import { PublicService } from './public.service';
import { Portfolio } from './interfaces/portfolio.interfaces'
import { MongoExceptionFilter } from '../utils/MongoFilter';
import { Userv2 } from '../schema/userv2.schema';
import { GetUser } from '../Auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('public')
@UseFilters(MongoExceptionFilter)
// @UseGuards(AuthGuard)
export class PublicController {
    constructor(private readonly publicService: PublicService){}

    @Get('project/:username/:id')
    findSingleProject(@Param() param): Promise<Project> {
      const username = param.username;   
      const id = param.id;   
      return this.publicService.findProject(username, id);
    } 

    @Get('allproject/:username')
    findProjectAll(@Param() param, @Query() query, @GetUser() user:Userv2): Promise<Project[]> {
      
      const username = param.username;
      const token = query.token
      return this.publicService.findAllProject(username, token, user);
    } 

    @Get('skills/:username')
    findSkillsAll(@Param() param, @Query() query, @GetUser() user:Userv2): Promise<Skills[]> {
      const username = param.username;
      const token = query.token
      return this.publicService.findSkills(username, token, user);  
    } 

    @Get('profile/:username')
    findProfileAll(@Param() param): Promise<Userv2> {
      const username = param.username;
      return this.publicService.findProfile(username);
    }

    @Get('experience/:username')
    findExperienceAll(@Param() param, @Query() query, @GetUser() user:Userv2): Promise<Experience[]> {
      const username = param.username;
      const token = query.token
      return this.publicService.findExperience(username, token, user);
    } 

    @Get('education/:username')
    findEducationAll(@Param() param, @Query() query, @GetUser() user:Userv2): Promise<Education[]> {
      const username = param.username;
      const token = query.token;
      return this.publicService.findEducation(username, token, user);

    } 

}
