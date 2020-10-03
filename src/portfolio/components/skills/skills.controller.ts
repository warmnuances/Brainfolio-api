import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { SkillsDto } from './dto/skills.dto';
import { SkillsService } from './skills.service'
import { Skills } from './interfaces/skills.interface'

@Controller('edit/skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService){}
    // portfolio id missing
    // @Get()
    // findAll(): Promise<Education[]> {
    //     return this.educationService.findAll();
    // } 

    @Get(':id')
    findOne(@Param() param): Promise<Skills> {
        return this.skillsService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createSkillsDto: SkillsDto): Promise<Skills> {
        return this.skillsService.create(createSkillsDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Skills> {
        return this.skillsService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateSkillsDto: Skills, @Param() param): Promise<Skills> {
        return this.skillsService.update(param.id, updateSkillsDto);
    }

}
