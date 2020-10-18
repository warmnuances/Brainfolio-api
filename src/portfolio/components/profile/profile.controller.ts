import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service'
import { Profile } from './interfaces/profile.interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../Auth/user.schema';

@Controller('edit/profile')
@UseGuards(AuthGuard())
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}
    // portfolio id missing
    @Get()
    findAll(@GetUser() user: User): Promise<Profile[]> {
        return this.profileService.findAll(user.username);
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Profile> {
        return this.profileService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createProfileDto: ProfileDto): Promise<Profile> {
        return this.profileService.create(createProfileDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Profile> {
        return this.profileService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateProfileDto: Profile, @Param() param): Promise<Profile> {
        return this.profileService.update(param.id,updateProfileDto);
    }

}
