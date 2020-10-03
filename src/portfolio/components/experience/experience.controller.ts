import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { ExperienceDto} from './dto/experience.dto';
import { ExperienceService } from './experience.service'
import { Experience } from './interfaces/experience.interface'

@Controller('edit/experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService){}
    // portfolio id missing
    // @Get()
    // findAll(): Promise<Education[]> {
    //     return this.educationService.findAll();
    // } 

    @Get(':id')
    findOne(@Param() param): Promise<Experience> {
        return this.experienceService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createExperienceDto: ExperienceDto): Promise<Experience> {
        return this.experienceService.create(createExperienceDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Experience> {
        return this.experienceService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateExperienceDto: Experience, @Param() param): Promise<Experience> {
        return this.experienceService.update(param.id, updateExperienceDto);
    }

}
