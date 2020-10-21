import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in-dto';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { deprecate } from 'util';



@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}
  

  /** @deprecated */
  @Post('/signup')
  @ApiTags('Deprecated')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<Partial<User>>{
    const User = await this.authService.signUp(createUserDto)
    delete User.password
    delete User.salt
    return User
  }

  /** @deprecated */
  @Post("/signin")
  @ApiTags('Deprecated')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto){
    return this.authService.signIn(signInDto)

  }
}
