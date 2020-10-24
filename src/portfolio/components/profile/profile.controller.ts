import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service'
import { Profile } from './interfaces/profile.interface'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../Auth/get-user.decorator';
import { User } from '../../../Auth/user.schema';
import { diskStorage , memoryStorage} from 'multer';
import {profilebackgroundFileFilter ,editProfileImageName, editBackgroundImageName, imageFileFilter} from '../../../utils/file-uploading.utils';
import {FileDto} from './dto/profile-file.dto';
import {FileFieldsInterceptor, FilesInterceptor} from '@nestjs/platform-express'


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
    create(@Body() createProfileDto): Promise<Profile> {
        console.log(createProfileDto);
        return this.profileService.create(createProfileDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Profile> {
        return this.profileService.delete(param.id);
    }

    // @Put(':id')
    // update(@Body() updateProfileDto: Profile, @Param() param): Promise<Profile> {
    //     return this.profileService.update(param.id,updateProfileDto);
    // }

    @Post('save')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profileImage', maxCount: 1},
        { name: 'backgroundImage', maxCount: 1 }
    ], {fileFilter: profilebackgroundFileFilter}
    ))
    // @GetUser() user:User
    saveProject(@UploadedFiles() image, @Body() profile, @GetUser() user:User):Promise<Profile>{  


      return this.profileService.saveProject(image, profile, user.username)
    }
}
