import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service'
import { Profile } from './interfaces/profile.interface'

@Controller('edit/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}
    // portfolio id missing
    // @Get()
    // findAll(): Promise<Education[]> {
    //     return this.educationService.findAll();
    // } 

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
