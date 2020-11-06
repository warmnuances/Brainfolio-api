import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ExperienceDto} from './dto/experience.dto';
import { ExperienceService } from './experience.service'
import { Experience } from './schemas/experience.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../schema/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Experience")
@Controller('edit/experience')
@UseGuards(AuthGuard())
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService){}
    // portfolio id missing
    @Get()
    findAll(@GetUser() user: User): Promise<Experience[]> {
        return this.experienceService.findAll(user.username);
    } 

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
    update(@Body() updateExperienceDto: ExperienceDto, @Param() param): Promise<Experience> {
        return this.experienceService.update(param.id, updateExperienceDto);
    }

}
