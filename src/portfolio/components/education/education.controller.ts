import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { EducationDto } from './dto/education.dto';
import { EducationService } from './education.service'
import { Education } from './interfaces/education.interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../Auth/user.schema';

@Controller('edit/education')
@UseGuards(AuthGuard())
export class EducationController {
    constructor(private readonly educationService: EducationService){}

    @Get()
    findAll(@GetUser() user: User): Promise<Education[]> {
        return this.educationService.findAll(user.username);
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Education> {
        return this.educationService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createEducationDto: EducationDto): Promise<Education> {
        return this.educationService.create(createEducationDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Education> {
        return this.educationService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateEducationDto: Education, @Param() param): Promise<Education> {
        return this.educationService.update(param.id,updateEducationDto);
    }

}
