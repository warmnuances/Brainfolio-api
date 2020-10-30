import { Controller, Get, HttpException, HttpStatus, Param, Query, UseFilters, UseGuards } from '@nestjs/common';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import { PublicService } from './public.service';
import { Portfolio } from './interfaces/portfolio.interfaces'
import { UsernameCheck } from './usernameCheck.guard'
import { MongoExceptionFilter } from '../utils/MongoFilter';

@Controller('public')
@UseFilters(MongoExceptionFilter)
// @UseGuards(UsernameCheck)
export class PublicController {
    constructor(private readonly publicService: PublicService){}

    @Get('project/:username/:id')
    findSingleProject(@Param() param): Promise<Project> {
      const username = param.username;   
      const id = param.id;   
      return this.publicService.findProject(username, id);
    } 

    @Get('allproject/:username')
    findProjectAll(@Param() param, @Query() query): Promise<Project[]> {
      const username = param.username;
      const token = query.token
      return this.publicService.findAllProject(username, token);
    } 

    @Get('skills/:username')
    findSkillsAll(@Param() param, @Query() query): Promise<Skills[]> {
      const username = param.username;
      const token = query.token
      return this.publicService.findSkills(username, token);  
    } 

    @Get('profile/:username')
    findProfileAll(@Param() param): Promise<Profile> {
      const username = param.username;
      return this.publicService.findProfile(username);
    }

    @Get('experience/:username')
    findExperienceAll(@Param() param, @Query() query): Promise<Experience[]> {
      const username = param.username;
      const token = query.token
      return this.publicService.findExperience(username, token);
    } 

    @Get('education/:username')
    findEducationAll(@Param() param, @Query() query): Promise<Education[]> {
      const username = param.username;
      const token = query.token;
      return this.publicService.findEducation(username, token);

    } 

}
