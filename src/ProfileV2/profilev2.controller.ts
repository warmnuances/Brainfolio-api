import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';


import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../Authv2/get-user.decorator';
import { Userv2 } from '../schema/userv2.schema';
import { Profilev2} from '../schema/profilev2.schema';

import {FileFieldsInterceptor} from '@nestjs/platform-express';

import { CreateProfileDto } from './dto/create-profile-dto';
import { Profilev2Service } from './profilev2.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Profilev2")
@Controller('/v2/edit/profile')
@UseGuards(AuthGuard())
export class Profilev2Controller {
    constructor(private readonly profileService: Profilev2Service){}


   
    @Post("save")
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: 'avatarFile', maxCount: 1 },
            { name: 'backgroundFile', maxCount: 1 }
        ]
    ))
    create(
        @GetUser() user: Userv2,
        @UploadedFiles() files , 
        @Body() createProfileDto: CreateProfileDto
    ) {
        return this.profileService.updateProfile(createProfileDto, files, user)
    }

    // @Delete(':id')
    // delete(@Param() param): Promise<Profilev2> {
    //     return this.profileService.delete(param.id);
    // }




    // @Post('save')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'profileImage', maxCount: 1},
    //     { name: 'backgroundImage', maxCount: 1 }
    // ], {fileFilter: profilebackgroundFileFilter}
    // ))

    // // @GetUser() user:User
    // saveProject(@UploadedFiles() image, @Body() profile, @GetUser() user:User):Promise<Profile>{  


    //   return this.profileService.saveProject(image, profile, user.username)
    // }

}
