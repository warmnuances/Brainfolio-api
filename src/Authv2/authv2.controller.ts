import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthV2Service } from './authv2.service';
import { CheckUsernameDto } from './dto/check-username-dto';
import { SignUpDto } from './dto/sign-up-dto';
import { GetUser } from './get-user.decorator';
import { Userv2 } from './userv2.schema';



@Controller('/v2/auth')
export class AuthV2Controller {
  constructor(
    private authService: AuthV2Service,
  ) {}

  @Post('/check/username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(@Body(ValidationPipe) username:CheckUsernameDto){
    return this.authService.checkUniqueUsername(username);
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
}
