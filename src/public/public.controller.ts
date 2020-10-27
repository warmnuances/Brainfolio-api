import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import { PublicService } from './public.service';
import { Portfolio } from './interfaces/portfolio.interfaces'
import { UsernameCheck } from './usernameCheck.guard'
import { MongoExceptionFilter } from 'src/utils/MongoFilter';

@Controller('public')
@UseFilters(MongoExceptionFilter)
// @UseGuards(UsernameCheck)
export class PublicController {
    constructor(private readonly publicService: PublicService){}

    @Get('allproject/:username')
    findProjectAll(@Param() param): Promise<Project[]> {
      const username = param.username;      
      return this.publicService.findAllProject(username);
    } 

    @Get('project/:username/:id')
    findSingleProject(@Param() param): Promise<Project> {
      const username = param.username;   
      const id = param.id;   
      return this.publicService.findProject(username, id);
    } 

    // @Get('portfolio/:username')
    // getPortfolio(@Param() param) {

    //     const username = param.username;
    //     if(this.publicService.portfolioIsPublic(username)){
    //         var portfolio = {}

    //         portfolio['skills'] = this.publicService.findSkills(username);
    //         portfolio['profile'] = this.publicService.findProfile(username);
    //         portfolio['experience'] = this.publicService.findExperience(username);
    //         portfolio['education'] = this.publicService.findEducation(username);
    //         portfolio['project'] = this.publicService.findProject(username);
    //         console.log(portfolio);
            
    //         return portfolio;

    //     }else{
    //         return
    //     }

    // }

    @Get('skills/:username')
    findSkillsAll(@Param() param): Promise<Skills[]> {
      const username = param.username;
      if(this.publicService.portfolioIsPublic(username)){
          return this.publicService.findSkills(username);
      } else {
        return null;
      }
    
      
    } 
    @Get('profile/:username')
    findProfileAll(@Param() param): Promise<Profile> {
      const username = param.username;
      return this.publicService.findProfile(username);
    }
    @Get('experience/:username')
    findExperienceAll(@Param() param): Promise<Experience[]> {
      const username = param.username;
      if(this.publicService.portfolioIsPublic(username)){
        return this.publicService.findExperience(username);
      } else {
        return null;
      }
    } 

    @Get('education/:username')
    findEducationAll(@Param() param): Promise<Education[]> {
      const username = param.username;
      if(this.publicService.portfolioIsPublic(username)){
          return this.publicService.findEducation(username);
      } else {
        return null;
      }


    } 

}
