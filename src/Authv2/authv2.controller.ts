import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthV2Service } from './authv2.service';
import { CheckUsernameDto } from './dto/check-username-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { GetUser } from './get-user.decorator';
import { Userv2 } from '../schema/userv2.schema';
import { DarkModeDto } from './dto/dark-mode-dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';



@Controller('/v2/auth')
export class AuthV2Controller {
  constructor(
    private authService: AuthV2Service,
  ) {}

  
  @Post('/set/images')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  async uploadUserImages(@UploadedFiles() files, @GetUser() user:Userv2){
    return this.authService.uploadImages(files,user);
  }


  @Post('/set/darkmode')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async setDarkMode(@Body(ValidationPipe) mode: DarkModeDto, @GetUser() user:Userv2){
    return this.authService.setDarkMode(mode,user);
  }

  @Post('/set/username')
  @UseGuards(AuthGuard())
  async setUsername(@Body(ValidationPipe) signUpDto: SignUpDto, @GetUser() user:Userv2){
    return this.authService.setUsername(signUpDto,user);
  }

  
  @Post("/validate")
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async synchroniseUser(@GetUser() user:Userv2){
    return user;
  }


  /** Routes that do not need authentication **/  
  @Post('/check/username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(@Body(ValidationPipe) username:CheckUsernameDto){
    return this.authService.checkUniqueUsername(username);
  }

}


