import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { SkillsDto } from './dto/skills.dto';
import { SkillsService } from './skills.service'
import { Skills } from './schemas/skills.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../schema/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Skills")
@Controller('edit/skills')
@UseGuards(AuthGuard())
export class SkillsController {
    constructor(private readonly skillsService: SkillsService){}
    // portfolio id missing
    @Get()
    findAll(@GetUser() user: User): Promise<Skills[]> {
        return this.skillsService.findAll(user.username);
    } 

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
    update(@Body() updateSkillsDto: SkillsDto, @Param() param): Promise<Skills> {
        return this.skillsService.update(param.id, updateSkillsDto);
    }

}
