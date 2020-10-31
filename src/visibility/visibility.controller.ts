import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../Auth/get-user.decorator';
import { Userv2 } from '../schema/userv2.schema';
import { createTokenDto } from './dto/create-token.dto';
import { Visibility } from '../schema/visibility.schema';  
import { VisibilityService } from './visibility.service';

@Controller('token')
@UseGuards(AuthGuard()) 
export class VisibilityController {
    constructor(private readonly visibilityService: VisibilityService){}

    @Post()
    insertToken(@GetUser() user: Userv2, @Body(ValidationPipe) body:createTokenDto):Promise<Visibility>{
        const username = user.username;
        const fullname = user.fullname;
        return this.visibilityService.createToken(fullname, username, body)
    }

    @Delete(':token')
    deleteToken(@GetUser() user: Userv2, @Param() param):Promise<Visibility>{
        const token = param.token;
        const username = user.username;
        return this.visibilityService.deleteToken(username,token);
    }



}
