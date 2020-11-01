import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';

import { CustomService } from './custom.service';
import { CustomDto } from './dto/custom.dto';
import { Custom } from './interfaces/custom.interface'
import { CustomTitleDto } from './dto/custom.title.dto';
import { CustomTitle } from './interfaces/custom.title.interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../schema/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Custom")
@Controller('edit/custom')
@UseGuards(AuthGuard())
export class CustomController {
    constructor(private readonly customService: CustomService){}

    @Get()
    findAll(@GetUser() user: User): Promise<Custom[]> {
        return this.customService.findAll(user.username);
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Custom> {
        return this.customService.findOne(param.id);
    }
    @Get('sectiontitle/:type')
    findOneTitle(@GetUser() user: User, @Param() param): Promise<CustomTitle>{
        return this.customService.findOneTitle(user.username,param.type);
    }

    @Post('item')
    create(@Body(ValidationPipe) createCustomDto: CustomDto): Promise<Custom> {
        return this.customService.create(createCustomDto);
    }
    @Post('sectiontitle')
    //Section title button will just be this function instead of put
    createtitle(@Body(ValidationPipe) createCustomTitleDto: CustomTitleDto, @GetUser() user: User): Promise<CustomTitle> {
        return this.customService.createTitle(createCustomTitleDto, user.username);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Custom> {
        return this.customService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateCustomDto: Custom, @Param() param): Promise<Custom> {
        return this.customService.update(param.id,updateCustomDto);
    }

}
